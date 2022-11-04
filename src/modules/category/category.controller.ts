import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { JwtAuthGuard } from 'src/common/guards';
import { ApiCategoryCreateBody, ApiCategoryCretedBadRequestResponse, ApiCategoryDeleteBadRequestResponse, ApiCategoryDeleteOkResponse, ApiCategoryDeleteParam, ApiCategoryGetAllBadRequestResponse, ApiCategoryGetAllOkResponse, ApiCategoryGetOneBadRequestResponse, ApiCategoryGetOneOkResponse, ApiCategoryGetOneParam, ApiCategoryUpdateBadRequestResponse, ApiCategoryUpdateBody, ApiCategoryUpdateOkResponse, ApiCategoryUpdateParam } from './category.document';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFindAllDto } from './dto/find-all-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity, CategoryEnum } from './entities/category.entity';

@ApiBearerAuth()
@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiBody(ApiCategoryCreateBody)
  @ApiCreatedResponse(ApiCategoryCretedBadRequestResponse)
  @ApiBadRequestResponse(ApiCategoryCretedBadRequestResponse)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const role = req.user.role
    const data: CategoryEntity = await this.categoryService.create(createCategoryDto, userId, role);
    res.status(201).send(data)
  }


  @Get()
  @ApiOkResponse(ApiCategoryGetAllOkResponse)
  @ApiBadRequestResponse(ApiCategoryGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
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
  @ApiParam(ApiCategoryGetOneParam)
  @ApiOkResponse(ApiCategoryGetOneOkResponse)
  @ApiBadRequestResponse(ApiCategoryGetOneBadRequestResponse)
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const role = req.user.role
    const data: CategoryEntity = await this.categoryService.findOne(id, userId, role);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "get category was successfuly",
      data
    })
  }

  @Patch(':id')
  @ApiParam(ApiCategoryUpdateParam)
  @ApiBody(ApiCategoryUpdateBody)
  @ApiOkResponse(ApiCategoryUpdateOkResponse)
  @ApiBadRequestResponse(ApiCategoryUpdateBadRequestResponse)
  async update(
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const data: [number, CategoryEntity[]] = await this.categoryService.update(id, updateCategoryDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update category was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update category was failed",
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiCategoryDeleteParam)
  @ApiOkResponse(ApiCategoryDeleteOkResponse)
  @ApiBadRequestResponse(ApiCategoryDeleteBadRequestResponse)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    const role = req.user.role
    const data: number = await this.categoryService.remove(id, userId, role);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete category was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete category was failed",
      })
    }
  }
}
