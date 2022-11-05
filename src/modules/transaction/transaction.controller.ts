import { Controller, Get, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { FastifyReply } from 'fastify';
import { TransactionEntity } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/common/guards';
import { ApiTransactionDeleteBadRequestResponse, ApiTransactionDeleteOkResponse, ApiTransactionDeleteParam, ApiTransactionGetAllBadRequestResponse, ApiTransactionGetAllOkResponse, ApiTransactionGetOneBadRequestResponse, ApiTransactionGetOneOkResponse, ApiTransactionGetOneParam } from './transaction.document';

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
  @ApiOkResponse(ApiTransactionGetAllOkResponse)
  @ApiBadRequestResponse(ApiTransactionGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransactionEntity[] = await this.transactionService.findAll(userId);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all transaction was failed",
      })
    }
  }

  @Get(':id')
  @ApiParam(ApiTransactionGetOneParam)
  @ApiOkResponse(ApiTransactionGetOneOkResponse)
  @ApiBadRequestResponse(ApiTransactionGetOneBadRequestResponse)
  async findOne(@Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: TransactionEntity = await this.transactionService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get transaction was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get transaction was failed",
      })
    }
  }


  @Delete(':id')
  @ApiParam(ApiTransactionDeleteParam)
  @ApiOkResponse(ApiTransactionDeleteOkResponse)
  @ApiBadRequestResponse(ApiTransactionDeleteBadRequestResponse)
  async remove(@Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    const data: number = await this.transactionService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete transaction was successfuly"
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete transaction was failed"
      })
    }

  }
}
