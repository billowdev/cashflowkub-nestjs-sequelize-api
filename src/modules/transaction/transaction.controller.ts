import { Controller, Get, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { FastifyReply } from 'fastify';
import { TransactionEntity } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/common/guards';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }


  // async create(@Body() createTransactionDto: CreateTransactionDto,
  //   @Res() res: FastifyReply) {
  //   const data: TransactionEntity = await this.transactionService.create(createTransactionDto);
  //   if (data) {
  //     res.status(200).send({
  //       statusCode: res.statusCode,
  //       message: "create transaction successfuly",
  //       data
  //     })
  //   } else {
  //     res.status(400).send({
  //       statusCode: res.statusCode,
  //       message: "create transaction failed",
  //       data: {}
  //     })
  //   }
  // }

  @Get()
  @ApiOkResponse({
    description: 'get all transaction was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all transaction was successfuly",
        data: [
          {
            "id": "adada566-9708-4903-b5d3-461ab70f779a",
            "type": "cashflowout",
            "userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
            "createdAt": "2022-10-16T10:36:07.551Z",
            "updatedAt": "2022-10-16T10:36:07.551Z",
            "cashflowin": null,
            "cashflowout": {
              "createdAt": "2022-10-16T10:36:07.551Z",
              "updatedAt": "2022-10-16T10:36:07.551Z",
              "id": 'e11ee770-79ec-40b5-8726-cfd6aff1e81b',
              "desc": "expense 1",
              "amount": 120.00,
              "type": "variable",
              "pocketId": '8407abe9-cbdf-4745-b634-681f42693ee9',
              "categoryId": 'd810173c-f848-4e87-b9f0-d9f172856551',
            },
            "transfer": null
          }
        ]

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all transaction was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get all transaction was failed",
        error: "Bad Request"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransactionEntity[] = await this.transactionService.findAll(userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all transaction successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all transaction failed",
        data: {}
      })
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your transaction id that you want to request data',
    example: 'adada566-9708-4903-b5d3-461ab70f779a'
  })
  @ApiOkResponse({
    description: 'get transaction was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get transaction was successfuly",
        data:
        {
          "id": "adada566-9708-4903-b5d3-461ab70f779a",
          "type": "cashflowout",
          "userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          "createdAt": "2022-10-16T10:36:07.551Z",
          "updatedAt": "2022-10-16T10:36:07.551Z",
          "cashflowin": null,
          "cashflowout": {
            "createdAt": "2022-10-16T10:36:07.551Z",
            "updatedAt": "2022-10-16T10:36:07.551Z",
            "id": 'e11ee770-79ec-40b5-8726-cfd6aff1e81b',
            "desc": "expense 1",
            "amount": 120.00,
            "type": "variable",
            "pocketId": '8407abe9-cbdf-4745-b634-681f42693ee9',
            "categoryId": 'd810173c-f848-4e87-b9f0-d9f172856551',
          },
          "transfer": null
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get transaction was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get transaction was failed",
        error: "Bad Request"
      }
    }
  })
  async findOne(@Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: TransactionEntity = await this.transactionService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get transaction by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get transaction by id failed",
        data: {}
      })
    }
  }


  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your transaction id that you want to delete data',
    example: 'adada566-9708-4903-b5d3-461ab70f779a'
  })
  @ApiOkResponse({
    description: 'delete transaction was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete transaction was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete transaction was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete transaction was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(@Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    const data: number = await this.transactionService.remove(id, userId);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "delete transaction successfuly",
      data
    })
  }
}
