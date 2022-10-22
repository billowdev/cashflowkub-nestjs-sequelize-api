import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {  DebtEnum } from "../entities/debt.entity";

export class CreateDebtDto {

	@ApiProperty({
		description: 'Type of debt',
		default: DebtEnum.SHORT,
		enum: DebtEnum
	})
	@IsNotEmpty()
	@IsString()
	type: DebtEnum

	@ApiProperty({
		description: 'Amount of debt',
		example: 2000.00
	})
	@IsNumber()
	@IsNotEmpty()
	amount: number

	@ApiProperty({
		description: 'Interest of debt (percent)',
		example: 3.0
	})
	@IsNumber()
	@IsNotEmpty()
	interest: number

	@ApiProperty({
		description: 'Minimum pay for debt',
		example: 100.00
	})
	@IsNumber()
	@IsNotEmpty()
	minimumPay: number

	@ApiProperty({
		description: 'The number of priority of debt',
		example: 1,
		nullable: true
	})
	@IsNumber()
	@IsNotEmpty()
	priority: number

	@ApiProperty({
		description: 'Foreign key as user id',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
	@IsString()
	@IsNotEmpty()
	userId: string

}
