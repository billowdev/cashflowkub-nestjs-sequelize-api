import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CashflowoutEnum } from "../entities/cashflowout.entity";

export class CreateCashflowoutDto {

	@ApiProperty({
		description: 'The description for cashflowout transaction',
		example: 'buy japanese food',
		maxLength: 150
	})
	@IsString()
	@IsNotEmpty()
	desc: string;

	@ApiProperty({
		description: 'Amount for cashflowout transaction',
		example: 100.00
	})
	@IsNumber()
	@IsNotEmpty()
	amount: number;

	@ApiProperty({
		description: 'Type for cashflowout transaction',
		enum: CashflowoutEnum,
		example: CashflowoutEnum.VARIABLE
	})
	@IsString()
	@IsNotEmpty()
	type: CashflowoutEnum;

	@ApiProperty({
		description: 'Foreign key as pocket id',
		example: '8407abe9-cbdf-4745-b634-681f42693ee9',
	})
	@IsString()
	@IsNotEmpty()
	pocketId: string;

	@ApiProperty({
		description: 'Foreign key as user id',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
	@IsString()
	@IsNotEmpty()
	userId: string;

	@ApiProperty({
		description: 'Foreign key as categoryId',
		example: 'd810173c-f848-4e87-b9f0-d9f172856551',
	})
	@IsString()
	@IsNotEmpty()
	categoryId: string;

}


export type BulkCreateCashflowoutDto = CreateCashflowoutDto[]
