import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TransactionEnum } from "../entities/transaction.entity"

export class CreateTransactionDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: TransactionEnum

	@ApiProperty()
	@IsString()
	@IsOptional()
	cashflowinId: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	cashflowoutId: string

	@ApiProperty()
	@IsString()
	@IsOptional()
	transferId: string

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string
}
