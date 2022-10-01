import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator"
import { UserAttributes } from "../entities/user.entity";


export class CreateUserDto {

	@ApiProperty()
	@IsString()
    readonly username: string;
	
	@ApiProperty()
	@IsString()
    readonly password: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
    readonly firstName: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
    readonly lastName: string;

	@ApiProperty()
	@IsEmail()
	@IsOptional()
    readonly email: string;
}
