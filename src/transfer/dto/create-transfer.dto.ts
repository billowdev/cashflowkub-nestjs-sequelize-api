import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTransferDto {
	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	amount: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	fromPocketId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	toPocketId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string
}
