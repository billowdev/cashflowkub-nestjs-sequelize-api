import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RequestAuthUserDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/guards';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFindAllDto } from './dto/find-all-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@ApiBearerAuth()
@ApiTags('categories')
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const role = req.user.role
    const data: CategoryEntity = await this.categoryService.create(createCategoryDto, userId, role);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "create category successfuly",
      data
    })
  }

  @Get()
  async findAll(
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const data: CategoryFindAllDto = await this.categoryService.findAll(userId);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "get all category successfuly",
      data
    })
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const role = req.user.role
    const data: CategoryEntity = await this.categoryService.findOne(id, userId, role);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "get category by id successfuly",
      data
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const data: [number, CategoryEntity[]] = await this.categoryService.update(id, updateCategoryDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update category by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update category by id failed",
        data
      })
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    const role = req.user.role
    const data: number = await this.categoryService.remove(id, userId, role);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete category by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete category by id failed",
        data
      })
    }
  }
}
