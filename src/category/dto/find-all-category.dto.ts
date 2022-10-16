import { CategoryEntity } from '../entities/category.entity';

export class CategoryFindAllDto {
	systemCategories: CategoryEntity[]
	customCategories: CategoryEntity[]
}