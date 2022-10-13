import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"
import { CategoryEnum } from "../entities/category.entity"

export class CreateCategoryDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	desc: string
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: CategoryEnum
	
}
