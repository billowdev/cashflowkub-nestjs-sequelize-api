import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { CategoryEnum } from "../entities/category.entity"

export class CreateCategoryDto {

	@ApiProperty({
		description: 'Name of category',
		example: 'food',
		maxLength: 100
	})
	@IsNotEmpty()
	@IsString()
	name: string
	
	@ApiProperty({
		description: 'The description for category',
		example: 'Food is expense category',
		maxLength: 200,
		nullable: true
	})
	@IsString()
	@IsNotEmpty()
	desc: string
	
	@ApiProperty({
		description: 'Type of category',
		default: CategoryEnum.EXPENSE,
		enum: CategoryEnum
	})
	@IsString()
	@IsNotEmpty()
	type: CategoryEnum
	
}
