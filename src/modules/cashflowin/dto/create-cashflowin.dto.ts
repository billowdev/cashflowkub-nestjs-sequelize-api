import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CashflowinEntity } from "../entities/cashflowin.entity"

export class CreateCashflowinDto extends PartialType(CashflowinEntity) {

	@ApiProperty({
		description: 'The description for cashflowin transaction',
		example: 'salary from xyz company'
	})
	@IsString()
	@IsNotEmpty()
	desc: string;

	@ApiProperty({
		description: 'amount cashflowin transaction',
		example: 30000.00
	})
	@IsNumber()
	@IsNotEmpty()
	amount: number;

	@ApiProperty({
		description: 'The pocket id for cashflowin transaction',
		example: '604ac7c7-1603-4a6d-960d-ce6040bd29c1'
	})
	@IsString()
	@IsNotEmpty()
	pocketId: string;

	@ApiProperty({
		description: "user id of user who in session",
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
	})
	@IsString()
	@IsNotEmpty()
	userId: string;

	@ApiProperty({
		description: "category id for cashflowin transaction",
		example: 'd810173c-f848-4e87-b9f0-d9f172856555'
	})
	@IsString()
	@IsNotEmpty()
	categoryId: string;
}


export type BulkCreateCashflowinDto = CreateCashflowinDto[]
