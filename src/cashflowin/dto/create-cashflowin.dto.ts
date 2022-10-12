import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CashflowinEntity } from "../entities/cashflowin.entity";

type CashflowinType = Partial<CashflowinEntity>

export class CreateCashflowinDto implements CashflowinType {
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
	categoryId: string;
}
