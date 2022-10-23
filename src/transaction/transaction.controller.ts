import { Controller, Get, Post, Body, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { RequestWithAuth } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { TransactionEntity } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/common/guards';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto,
    @Res() res: FastifyReply) {
    const data: TransactionEntity = await this.transactionService.create(createTransactionDto);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "create transaction successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create transaction failed",
        data: {}
      })
    }
  }

  @Get()
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
