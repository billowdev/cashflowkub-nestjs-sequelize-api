import { BadRequestException, Body, Controller, Get, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDataDto, AuthDto, RequestWithAuth, SessionDataDto, SessionDto, SignDto } from './dto';
import { JwtAuthGuard, LocalGuard, UserIsExist } from '../common/guards';
import { FastifyReply } from 'fastify';
@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@UseGuards(UserIsExist)
	@ApiCreatedResponse({
		description: 'Created user successfuly',
		schema: {
			example: {
				"user": {
					"createdAt": "2022-10-24T06:15:24.179Z",
					"updatedAt": "2022-10-24T06:15:24.179Z",
					"id": "da9fbc15-cacb-42b9-b1f9-20744c8e940c",
					"isActive": true,
					"role": "user",
					"email": "billowdev@gmail.com",
					"username": "billowdev",
					"firstName": "Billow",
					"lastName": "dev",
					"phone": null
				},
				"token": "JSONWEBTOKEN",
				"role": "user"
			}
		}
	})
	@ApiBadRequestResponse({ description: 'User cannot register. please try again' })
	@Post('signup')
	async signup(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		const data: AuthDataDto = await this.authService.signup(dto)
		res.status(201).send(data)
	}

	@Post('signin')
	@ApiBody({
		description: 'The body for signup',
		schema: {
			example: {
				"username": "billowdev",
				"password": "yourpassword1234",
			}
		}
	})
	@ApiOkResponse({ type: SignDto })
	@ApiBadRequestResponse({ description: 'User signin failed. please try again' })
	@UseGuards(LocalGuard)
	async signin(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		const data: AuthDataDto = await this.authService.signin(dto)
		res.status(200).send(data)
	}


	@UseGuards(JwtAuthGuard)
	@ApiOkResponse({ type: SessionDto })
	@ApiUnauthorizedResponse({
		description: 'User Unauthorized ',
		schema: {
			example: {
				"statusCode": 401,
				"message": "Unauthorized"
			}
		}
	})
	@Get('session')
	async session(
		@Req() req: RequestWithAuth,
		@Res() res: FastifyReply
	) {
		try {
			const data: SessionDataDto = await this.authService.session(req.user)
			res.status(200).send(data)
		} catch (error) {
			throw new BadRequestException()
		}
	}
}
