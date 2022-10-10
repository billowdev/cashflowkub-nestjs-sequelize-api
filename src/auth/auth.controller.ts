import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, sessionDataDto, SessionDto, SignDto } from './dto';
import { JwtAuthGuard, LocalGuard, UserIsExist } from './guards';
// import { Request } from '@nestjs/common/decorators';

export interface requestAuthUser extends Request {
	user: sessionDataDto
}

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
	signin(@Body() dto: AuthDto): Promise<SignDto> {
		return this.authService.signin(dto);
	}


	@UseGuards(UserIsExist)
	@Post('signup')
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto);
	}

	@ApiResponse({ type: SessionDto })
	@UseGuards(JwtAuthGuard)
	@Get('session')
	session(
		@Request() req: requestAuthUser
	): SessionDto {
		try {
			return {
				success: true,
				message: "request session successfuly",
				data: req.user
			}
		} catch (error) {
			throw new BadRequestException()
		}
	}
}
