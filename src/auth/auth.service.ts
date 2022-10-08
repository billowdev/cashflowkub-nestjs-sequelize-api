import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from './dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) { }

	// generate token
	private async generateToken(auth) {
		const token = await this.jwtService.signAsync(auth);
		return token
	}

	// password hasing
	private async hashPassword(password) {
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

	// service for auth controller

	// signin : login service
	public async signin(auth): Promise<SignDto> {
		try {
			const { id, role } = await this.userService.findOneByUsername(auth.username)
			// agency shop account
			const user = await this.userService.findOne(id);
			delete auth.password
			const token = await this.generateToken({ sub: id, uid: user.id, role });
			return { user: { id, role, ...auth }, token }
		} catch (error) {
			throw new BadRequestException()
		}

	}

	// signup : register service
	public async signup(user): Promise<any> {
		try {
			const hashPassword = await this.hashPassword(user.password);
			const result = await this.userService.create({ ...user, hashPassword });
			delete result['dataValues'].hashPassword
			const payload = {
				sub: result['dataValues'].id,
				role: result['dataValues'].role
			}
			const token = await this.generateToken(payload);
			return { user: result, token };
		} catch (error) {
			console.log('====================================');
			console.log("error");
			console.log('====================================');
			// throw new BadRequestException()
		}
	}


}
