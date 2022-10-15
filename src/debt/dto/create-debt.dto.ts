import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {  DebtEnum } from "../entities/debt.entity";

export class CreateDebtDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	type: DebtEnum

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	amount: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	interest: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	minimumPay: number

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	priority: number

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string

}
