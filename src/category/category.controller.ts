import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RequestWithAuthDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/guards';
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
  @ApiBody({
    description: 'The body of category for create',
    schema: {
      example: {
        name: "รายจ่าย",
        desc: "รายจ่าย",
        type: CategoryEnum.EXPENSE
      }
    }
  })
  @ApiCreatedResponse({
    description: 'create category successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create category successfuly",
        data:
        {
          statusCode: 201,
          message: "create category successfuly",
          data: {
            id: "d810173c-f848-4e87-b9f0-d9f172856555",
            name: "เติมเกมส์",
            desc: "รายจ่ายไม่จำเป็น",
            type: "expense",
            isCustom: true,
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0118a",
            createdAt: "2022-10-16T10:36:07.496Z",
            updatedAt: "2022-10-16T10:36:07.496Z"
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'category cannot create',
    schema: {
      example: {
        statusCode: 400,
        message: "create category failed",
        error: "Bad Request"
      }
    }
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: RequestWithAuthDto,
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
  @ApiCreatedResponse({
    description: 'get all category was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all category was successfuly",
        data: {
          customCategories: [
            {
              id: "d810173c-f848-4e87-b9f0-d9f172856555",
              name: "รายจ่าย 1",
              desc: "รายจ่าย",
              type: "expense",
              isCustom: true,
              createdAt: "2022-10-16T10:36:07.496Z",
              updatedAt: "2022-10-22T13:00:26.643Z"
            }
          ],
          systemCategories: [
            {
              id: "d810173c-f848-4e87-b9f0-d9f172856551",
              name: "ค่าอาหาร",
              desc: "ค่าอาหาร การกิน",
              type: "expense",
              isCustom: false,
              createdAt: "2022-10-16T10:36:07.496Z",
              updatedAt: "2022-10-16T10:36:07.496Z"
            }]
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all category was failed',
    schema: {
      example: {
        statusCode: 400,
        message: 'get all category was failed',
        error: 'Bad Request'
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuthDto,
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
  @ApiParam({
    name: 'id',
    description: 'Enter your category id that you want to request data',
    example: 'd810173c-f848-4e87-b9f0-d9f172856555'
  })
  @ApiCreatedResponse({
    description: 'get category was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get category was successfuly",
        data: {
          id: "d810173c-f848-4e87-b9f0-d9f172856555",
          name: "salary",
          desc: "เงินเดือน",
          type: CategoryEnum.INCOME,
          isCustom: false,
          userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          createdAt: "2022-10-16T10:36:07.496Z",
          updatedAt: "2022-10-16T10:36:07.496Z"
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get category was failed',
    schema: {
      example: {
        statusCode: 400,
        message: 'get category was failed',
        error: 'Bad Request'
      }
    }
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuthDto,
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
  @ApiParam({
    name: 'id',
    description: 'Enter your category id that you want to update data',
    example: 'd810173c-f848-4e87-b9f0-d9f172856555'
  })
  @ApiBody({
    description: 'The body of category for update',
    schema: {
      example: {
        "name": "รายจ่าย 2",
        "desc": "รายจ่าย",
        "type": "expense"
      }
    }
  })
  @ApiOkResponse({
    description: 'update category was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update category was successfuly",
        data: [
          1
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update category was failed', schema: {
      example: {
        statusCode: 400,
        message: "update category was failed",
        error: "Bad Request"
      }
    }
  })
  async update(
    @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    const data: [number, CategoryEntity[]] = await this.categoryService.update(id, updateCategoryDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update category was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update category was failed",
        data
      })
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your category id that you want to delete data',
    example: 'd810173c-f848-4e87-b9f0-d9f172856555'
  })
  @ApiOkResponse({
    description: 'delete category was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete category was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete category was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete category was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    const role = req.user.role
    const data: number = await this.categoryService.remove(id, userId, role);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete category was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete category was failed",
        data
      })
    }
  }
}
