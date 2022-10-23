import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from 'src/common/core/constants';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { Role } from 'src/user/entities/role.enum';
import { CategoryFindAllDto } from './dto/find-all-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepo: typeof CategoryEntity

  ) { }
  async create(createCategoryDto: CreateCategoryDto, userId: string, role: string): Promise<CategoryEntity> {
    try {
      if (role === Role.ADMIN) {
        const category = new CategoryEntity()
        category.name = createCategoryDto.name
        category.desc = createCategoryDto.desc
        category.type = createCategoryDto.type
        category.isCustom = false
        category.userId = userId
        return await this.categoryRepo.create<CategoryEntity>(category['dataValues'])
      } else {
        const category = new CategoryEntity()
        category.name = createCategoryDto.name
        category.desc = createCategoryDto.desc
        category.type = createCategoryDto.type
        category.isCustom = true
        category.userId = userId
        return await this.categoryRepo.create<CategoryEntity>(category['dataValues'])
      }
    } catch (error) {
      throw new BadRequestException('create category failed')
    }
  }

  async findAll(userId: string): Promise<CategoryFindAllDto> {
    try {
      const systemCategories = await this.categoryRepo.findAll<CategoryEntity>({
        attributes: {
          exclude: ['userId']
        },
        where: { isCustom: false },
        raw: true
      })

      const customCategories = await this.categoryRepo.findAll<CategoryEntity>({
        attributes: {
          exclude: ['userId']
        },
        where: { userId, isCustom: true },
        raw: true
      })
      return { customCategories, systemCategories }
    } catch (error) {
      throw new BadRequestException('get all category failed')
    }
  }

  async findOne(id: string, userId: string, role: string) {
    try {
      if (role === Role.ADMIN) {
        return await this.categoryRepo.findOne({
          where: { id, isCustom: false, userId }
        })
      } else {
        return await this.categoryRepo.findOne({
          where: { id, isCustom: true, userId }
        })
      }
    } catch (error) {
      throw new BadRequestException('get category by id failed')
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, userId: string): Promise<[number, CategoryEntity[]]> {
    try {
      return await this.categoryRepo.update<CategoryEntity>(
        { ...updateCategoryDto },
        {
          where: { id, userId }
        })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string, userId: string, role: string) {
    try {
      if (role === Role.ADMIN) {
        return await this.categoryRepo.destroy({
          where: { id, isCustom: false }
        })
      } else {
        return await this.categoryRepo.destroy({
          where: { id, userId, isCustom: true }
        })
      }
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
