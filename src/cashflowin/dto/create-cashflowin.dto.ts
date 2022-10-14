import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CashflowinCreationAttributes, CashflowinEntity } from "../entities/cashflowin.entity"

export class CreateCashflowinDto extends PartialType(CashflowinEntity) {

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


export type BulkCreateCashflowinDto = CreateCashflowinDto[]
