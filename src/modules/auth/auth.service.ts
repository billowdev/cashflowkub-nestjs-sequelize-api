import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDataDto, AuthDto, SessionDataDto, SessionDto, SignDto, TokenPayloadDto } from './dto';
import { UserService } from 'src/modules/user/user.service';
import * as argon from 'argon2'
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	// generate token
	private async generateToken(auth: TokenPayloadDto) {
		const token: string = await this.jwtService.signAsync(auth);
		return token
	}
	// password hasing
	public async hashPassword(password) {
		const hash: string = await argon.hash(password, { type: argon.argon2id });
		return hash;
	}

	// check password
	private async comparePassword(password, dbPassword) {
		const match: boolean = await argon.verify(dbPassword, password)
		return match;
	}

	// validate authentication
	public async validateAuth(username: string, pass: string) {
		const user: UserEntity = await this.userService.findOneByUsername(username);
		if (!user) {
			return null;
		}

		const match: boolean = await this.comparePassword(pass, user.hashPassword);
		if (!match) {
			return null;
		}
		const result: UserEntity = user['dataValues']
		delete result.hashPassword
		return result;
	}

	public async signin(auth: AuthDto): Promise<AuthDataDto> {
		try {
			const user = await this.userService.findOneByUsername(auth.username, true)
			const token = await this.generateToken({ sub: user.id, role: user.role });
			const response: AuthDataDto = {
				user, token, role: user.role
			}
			return response
		} catch (error) {
			throw new BadRequestException("User logged in failure")
		}

	}

	// signup : register service
	public async signup(user: AuthDto): Promise<AuthDataDto> {
		try {
			const result = await this.userService.registerUser(user);
			delete result['dataValues'].hashPassword
			const payload = {
				sub: result['dataValues'].id,
				role: result['dataValues'].role
			}
			const token = await this.generateToken(payload);
			const data: AuthDataDto = { user: result, token, role: result.role }
			return data;
		} catch (error) {
			throw new BadRequestException("User registered failure")
		}
	}

	public async session(user: SessionDataDto): Promise<SessionDataDto> {
		try {
			const { sub, role } = user
			const payload: TokenPayloadDto = {
				sub,
				role
			}
			const token: string = await this.generateToken(payload);
			const data: SessionDataDto = { token, ...payload }
			return data
		} catch (error) {
			throw new BadRequestException()
		}
	}

}
