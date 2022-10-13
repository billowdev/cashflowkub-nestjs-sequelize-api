import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { CashflowoutEntity, CashflowoutEnum } from "../entities/cashflowout.entity";

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
	@IsOptional()
	userId?: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	categoryId: string;

}
