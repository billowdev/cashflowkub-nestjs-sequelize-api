import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TransactionEnum } from "../entities/transaction.entity"

export class CreateTransactionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: TransactionEnum

	@ApiProperty()
	@IsOptional()
	@IsString()
	cashflowinId: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	cashflowoutId: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	transferId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string
}
