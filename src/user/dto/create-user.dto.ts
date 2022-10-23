import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator"
import { Role } from "../entities/role.enum";


export class CreateUserDto {
	@ApiProperty({
		description: 'The username of user',
		example: 'billowdev',
		uniqueItems: true,
		maxLength: 100,
		nullable: false
	})
	@IsString()
	readonly username: string;

	@ApiProperty({
		description: 'The password of user',
		maxLength: 100,
		nullable: false
	})
	@IsString()
	readonly password: string;

	@ApiProperty({
		description: 'The first name of user',
		example: 'Billow',
		maxLength: 150,
		nullable: true
	})
	@IsString()
	@IsOptional()
	readonly firstName?: string;

	@ApiProperty({
		description: 'The last name of user',
		example: 'dev',
		maxLength: 150,
		nullable: true,
	})
	@IsString()
	@IsOptional()
	readonly lastName?: string;

	@ApiProperty({
		description: 'The email of user',
		example: 'billowdev@gmail.com',
		nullable: true,
		maxLength: 200,
		uniqueItems: true
	})
	@IsEmail()
	@IsOptional()
	readonly email?: string;

	@ApiProperty({
		description: 'Role of user',
		nullable: false,
		enum: Role,
		default: Role.USER
	})
	@IsString()
	@IsOptional()
	readonly role?: Role;
}
