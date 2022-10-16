import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryFindAllDto } from './dto/find-all-category.dto';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: typeof CategoryEntity);
    create(createCategoryDto: CreateCategoryDto, userId: string, role: string): Promise<CategoryEntity>;
    findAll(userId: string): Promise<CategoryFindAllDto>;
    findOne(id: string, userId: string, role: string): Promise<CategoryEntity>;
    update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string): Promise<[number, CategoryEntity[]]>;
    remove(id: string, userId: string, role: string): Promise<number>;
}
