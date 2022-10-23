import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { RequestWithAuth } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { TransferEntity } from './entities/transfer.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Transfers')
@Controller('transfers')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) { }

  @Post()
  @ApiBody({
    description: 'The body of transfer for create',
    schema: {
      example: {
        userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
        amount: 100,
        fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
        toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
      }
    }
  })
  @ApiCreatedResponse({
    description: 'create transfer was successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create transfer successfuly",
        data: {
          createdAt: "2022-10-23T08:47:11.494Z",
          updatedAt: "2022-10-23T08:47:11.494Z",
          id: "e03cf523-e63c-47c8-8ab4-42806eb2745a",
          userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          amount: "100.00",
          fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
          toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'create transfer was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "create transfer was failed",
        error: "Bad Request"
      }
    }
  })
  async create(@Body() createTransferDto: CreateTransferDto,
    @Res() res: FastifyReply) {
    const data: TransferEntity = await this.transferService.create(createTransferDto);
    res.status(201).send({
      statusCode: res.statusCode,
      message: 'create transfer successfuly',
      data
    })
  }

  @Get()
  @ApiOkResponse({
    description: 'get all transfer was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all transfer was successfuly",
        data:
          [{
            createdAt: "2022-10-23T08:47:11.494Z",
            updatedAt: "2022-10-23T08:47:11.494Z",
            id: "e03cf523-e63c-47c8-8ab4-42806eb2745a",
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
            amount: "100.00",
            fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
            toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
          }]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all transfer was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get all transfer was failed",
        error: "Bad Request"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity[] = await this.transferService.findAll(userId);
    res.status(200).send({
      statusCode: res.statusCode,
      message: 'get all transfer successfuly',
      data
    })
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your transfer id that you want to request data',
    example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a'
  })
  @ApiOkResponse({
    description: 'get transfer was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get transfer was successfuly",
        data:
        {
          createdAt: "2022-10-23T08:47:11.494Z",
          updatedAt: "2022-10-23T08:47:11.494Z",
          id: "e03cf523-e63c-47c8-8ab4-42806eb2745a",
          userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          amount: "100.00",
          fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
          toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
        }

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get transfer was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get transfer was failed",
        error: "Bad Request"
      }
    }
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity = await this.transferService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get transfer successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get transfer failed',
        data: {}
      })
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your transfer id that you want to delete data',
    example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a'
  })
  @ApiOkResponse({
    description: 'delete transfer was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete transfer was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete transfer was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete transfer was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: number = await this.transferService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'delete transfer successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'delete transfer failed',
        data: {}
      })
    }
  }

}
