import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class sessionDataDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	sub: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	role: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	iat: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	exp: number;

}

export class SessionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	message: string;

	@ApiProperty()
	@IsObject()
	data: sessionDataDto;
}

