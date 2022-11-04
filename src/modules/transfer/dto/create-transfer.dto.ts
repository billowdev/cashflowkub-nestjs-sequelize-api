import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateTransferDto {
	@ApiProperty({
		description: 'Amount of transfer transaction',
		example: 100.00
	})
	@IsNumber()
	@IsNotEmpty()
	amount: number

	@ApiProperty({
		description: 'Foreign key as from_pocket_id',
		example: '8407abe9-cbdf-4745-b634-681f42693ee9',
	})
	@IsString()
	@IsNotEmpty()
	fromPocketId: string

	@ApiProperty({
		description: 'Foreign key as to_pocket_id',
		example: '416c355b-e095-4007-9713-218e050dbae7',
	})
	@IsString()
	@IsNotEmpty()
	toPocketId: string

	@ApiProperty({
		description: 'Foreign key as user id',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
	@IsString()
	@IsNotEmpty()
	userId: string
}
