import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SessionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	id: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	uid: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	iat: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	exp: number;
}
