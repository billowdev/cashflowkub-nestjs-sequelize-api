import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestWithAuthDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/common/guards';
import { PocketEntity } from './entities/pocket.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Pockets')
@Controller('pockets')
export class PocketController {
  constructor(private readonly pocketService: PocketService) { }

  @Post()
  @ApiBody({
    description: 'The body of pocket for create new pocket',
    schema: {
      example: {
        name: "my wallet 1",
        balance: "1500.00",
        userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a"
      }
    }
  })
  @ApiCreatedResponse({
    description: 'create pocket was successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create pocket was successfuly",
        data:
        {
          id: "8407abe9-cbdf-4745-b634-681f42693ee9",
          name: "my wallet 1",
          balance: "1500.00",
          createdAt: "2022-10-16T10:36:07.502Z",
          updatedAt: "2022-10-16T11:43:03.602Z",
          userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a"
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'create pocket was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "create pocket was failed",
        error: "Bad Request"
      }
    }
  })
  async create(@Body() createPocketDto: CreatePocketDto,
    @Res() res: FastifyReply
  ) {
    const data: PocketEntity = await this.pocketService.create(createPocketDto);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "create pocket successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create pocket failed",
        data: {}
      })
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'get all pocket was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all pocket was successfuly",
        data:
        {
          statusCode: 200,
          message: "get all pocket was successfuly",
          data:
            [{
              id: "8407abe9-cbdf-4745-b634-681f42693ee9",
              name: "my wallet 1",
              balance: "1500.00",
              createdAt: "2022-10-16T10:36:07.502Z",
              updatedAt: "2022-10-16T11:43:03.602Z",
              userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a"
            }]
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all pocket was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get all pocket was failed",
        error: "Bad Request"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: PocketEntity[] = await this.pocketService.findAll(userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all pocket successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all pocket failed",
        data: {}
      })
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your pocket id that you want to request data',
    example: '8407abe9-cbdf-4745-b634-681f42693ee9'
  })
  @ApiOkResponse({
    description: 'get pocket was successfuly',
    schema: {
      example: {
        statusCode: 200,
          message: "get pocket was successfuly",
          data:
          {
            id: "8407abe9-cbdf-4745-b634-681f42693ee9",
            name: "my wallet 1",
            balance: "1500.00",
            createdAt: "2022-10-16T10:36:07.502Z",
            updatedAt: "2022-10-16T11:43:03.602Z",
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a"
          }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get pocket was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get pocket was failed",
        error: "Bad Request"
      }
    }
  })
  async findOne(@Param('id') id: string,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: PocketEntity = await this.pocketService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get pocket by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get pocket by id failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your pocket id that you want to update data',
    example: '8407abe9-cbdf-4745-b634-681f42693ee9'
  })
  @ApiBody({
    description: 'The body of debt for update',
    schema: {
      example: {
        name: "my wallet 1",
        balance: "1200.00",
        userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
      }
    }
  })
  @ApiOkResponse({
    description: 'update pocket was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update pocket was successfuly",
        data: [
          1
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update pocket was failed', schema: {
      example: {
        statusCode: 400,
        message: "update pocket was failed",
        error: "Bad Request"
      }
    }
  })
  async update(
    @Param('id') id: string, @Body() updatePocketDto: UpdatePocketDto,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: [number, PocketEntity[]] = await this.pocketService.update(id, updatePocketDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update pocket by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update pocket by id failed",
        data: {}
      })
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your pocket id that you want to delete data',
    example: '8407abe9-cbdf-4745-b634-681f42693ee9'
  })
  @ApiOkResponse({
    description: 'delete pocket was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete pocket was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete pocket was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete pocket was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: number = await this.pocketService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete pocket by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete pocket by id failed",
        data: {}
      })
    }
  }
}
