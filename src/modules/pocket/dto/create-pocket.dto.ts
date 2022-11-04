import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreatePocketDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	balance: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string
}
