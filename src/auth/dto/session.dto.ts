import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Role } from 'src/user/entities/role.enum';
import { v4 as uuidv4 } from 'uuid';

export class SessionDataDto {
	@ApiProperty({
		description: 'The user id from session',
		example: uuidv4()
	})
	@IsString()
	@IsNotEmpty()
	sub: string;

	@ApiProperty({
		description: 'The role of user',
		example: Role.USER
	})
	@IsString()
	@IsNotEmpty()
	role: string;

	@ApiProperty({
		description: 'The issued at time',
		example: 1666357543
	})
	@IsNumber()
	@IsNotEmpty()
	iat: number;

	@ApiProperty({
		description: 'The expiration time',
		example: 1666443943
	})
	@IsNumber()
	@IsNotEmpty()
	exp: number;

}

export class SessionDto {
	@ApiProperty({
		description: 'Response message',
		example: 'get session successfuly'
	})
	@IsString()
	@IsNotEmpty()
	message: string;

	@ApiProperty({
		description: 'The session data',
	})
	@IsObject()
	data: SessionDataDto;
}

