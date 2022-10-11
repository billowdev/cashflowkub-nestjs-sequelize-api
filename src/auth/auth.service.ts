import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignDto } from './dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService)) 
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	// generate token
	private async generateToken(auth) {
		const token = await this.jwtService.signAsync(auth);
		return token
	}

	// password hasing
	public async hashPassword(password) {
		const hash = await argon.hash(password, { type: argon.argon2id });
		return hash;
	}

	// check password
	private async comparePassword(password, dbPassword) {
		const match = await argon.verify(dbPassword, password)
		return match;
	}

	// validate authentication
	public async validateAuth(username: string, pass: string) {
		const user = await this.userService.findOneByUsername(username);
		if (!user) {
			return null;
		}

		const match = await this.comparePassword(pass, user.hashPassword);
		if (!match) {
			return null;
		}

		const result = user['dataValues']
		delete result.hashPassword
		return result;
	}

	public async signin(auth: AuthDto): Promise<SignDto> {
		try {
			const user = await this.userService.findOneByUsername(auth.username, true)
			const token = await this.generateToken({ sub: user.id, role: user.role });
			const response: SignDto = {
				message: "User logged in successfully",
				data: { user: user, token, role: user.role }
			}
			return response
		} catch (error) {
			throw new BadRequestException("User logged in failure")
		}

	}

	// signup : register service
	public async signup(user): Promise<SignDto> {
		try {
			const hashPassword = await this.hashPassword(user.password);
			const result = await this.userService.create({ ...user, hashPassword });
			delete result['dataValues'].hashPassword
			const payload = {
				sub: result['dataValues'].id,
				role: result['dataValues'].role
			}
			const token = await this.generateToken(payload);
			const response: SignDto = {
				message: "user signup successfully",
				data: { user: result, token, role: result.role }
			}
			return response;
		} catch (error) {
			throw new BadRequestException("User registered failure")
		}
	}


}
