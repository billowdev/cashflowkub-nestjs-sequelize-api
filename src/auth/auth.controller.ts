import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, RequestWithAuthDto, SessionDto, SignDto } from './dto';
import { JwtAuthGuard, LocalGuard, UserIsExist } from './guards';
import { FastifyReply } from 'fastify';
import { UserEntity } from 'src/user/entities/user.entity';

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
		type: UserEntity
	})
	@ApiBadRequestResponse({ description: 'User cannot register. please try again' })
	@Post('signup')
	async signup(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		res.send(await this.authService.signup(dto))
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: SignDto })
	@ApiBadRequestResponse({ description: 'User signin failed. please try again' })
	@UseGuards(LocalGuard)
	async signin(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		res.send(await this.authService.signin(dto))
	}


	@ApiOkResponse({ type: SessionDto })
	@UseGuards(JwtAuthGuard)
	@ApiBadRequestResponse({ description: 'get session was failed' })
	@Get('session')
	session(
		@Req() req: RequestWithAuthDto,
		@Res() res: FastifyReply
	) {
		try {
			res.send({
				message: "request session successfuly",
				data: req.user
			})
		} catch (error) {
			throw new BadRequestException()
		}
	}
}
