import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryFindAllDto {
	@ApiProperty({
		description: 'The cateogries are system category of admin',
		type: CategoryEntity
	})
	systemCategories: CategoryEntity[]

	@ApiProperty({
		description: 'The cateogries are custom category of user',
		type: CategoryEntity
	})
	customCategories: CategoryEntity[]
}