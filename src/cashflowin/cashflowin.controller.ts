import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/guards';
import { requestAuthUserDto } from '../auth/dto';
import { CashflowinService } from './cashflowin.service';
import { CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@UseGuards(JwtAuthGuard)
@Controller('cashflowins')
export class CashflowinController {
  constructor(private readonly cashflowinService: CashflowinService) { }

  @Post()
  async create(
    @Body() createCashflowinDto: CreateCashflowinDto,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const { sub } = req.user
    const data: CashflowinEntity = await this.cashflowinService.create(createCashflowinDto, sub);
    res.send({
      statusCode: res.statusCode,
      message: "create cashflow in successfuly",
      data
    })
  }

  @Get()
  async findAll(
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const { sub } = req.user
    const data: CashflowinEntity[] = await this.cashflowinService.findAll(sub);
    res.send({
      statusCode: res.statusCode,
      message: "get all cashflow in successfuly",
      data
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: CashflowinEntity = await this.cashflowinService.findOne(id);
    res.send({
      statusCode: res.statusCode,
      message: "get cashflow in by id successfuly",
      data
    })
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCashflowinDto: UpdateCashflowinDto,
    @Res() res: FastifyReply,
    @Req() { user }: requestAuthUserDto,) {
    const data = await this.cashflowinService.update(id, updateCashflowinDto, user.sub);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update cashflow in by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflow in by id failed",
        data: {}
      })
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: FastifyReply, @Req() { user }: requestAuthUserDto) {
    const data = await this.cashflowinService.remove(id, user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id failed",
        data: {}
      })
    }
  }
}
