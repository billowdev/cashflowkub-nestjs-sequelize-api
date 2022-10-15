import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { TransactionService } from './transaction.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';


@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto,
    @Res() res: FastifyReply) {
    const data = await this.transactionService.create(createTransactionDto);
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
  findAll(
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId = req.user.sub
    return this.transactionService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    return this.transactionService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    return this.transactionService.update(id, userId, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId = req.user.sub
    return this.transactionService.remove(id, userId);
  }
}
