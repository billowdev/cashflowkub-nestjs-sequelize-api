import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Res, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, requestAuthUserDto, SessionDto, SignDto } from './dto';
import { JwtAuthGuard, LocalGuard, UserIsExist } from './guards';
import { FastifyReply } from 'fastify';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService
	) { }

	@ApiResponse({ type: SignDto })
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@Post('signin')
	async signin(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		res.send(await this.authService.signin(dto))
	}

	@UseGuards(UserIsExist)
	@Post('signup')
	async signup(@Body() dto: AuthDto, @Res() res: FastifyReply) {
		res.send(await this.authService.signup(dto))
	}

	@ApiResponse({ type: SessionDto })
	@UseGuards(JwtAuthGuard)
	@Get('session')
	session(
		@Req() req: requestAuthUserDto,
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
