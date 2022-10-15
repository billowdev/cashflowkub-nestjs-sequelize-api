import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { TransactionEntity } from './entities/transaction.entity';


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
    @Req() req: requestAuthUserDto,
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
  findOne(@Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    return this.transactionService.findOne(id, userId);

  }


  @Delete(':id')
  remove(@Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    return this.transactionService.remove(id, userId);
  }
}
