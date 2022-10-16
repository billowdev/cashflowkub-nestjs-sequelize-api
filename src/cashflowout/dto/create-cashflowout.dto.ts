import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CashflowoutEnum } from "../entities/cashflowout.entity";

export class CreateCashflowoutDto {

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	desc: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	amount: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: CashflowoutEnum;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	pocketId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	categoryId: string;

}

export type BulkCreateCashflowoutDto = CreateCashflowoutDto[]
