import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { categoryProviders } from './entities/category.providers';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ...categoryProviders]
})
export class CategoryModule { }
