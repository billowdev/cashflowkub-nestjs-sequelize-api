import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { CashflowoutService } from './cashflowout.service';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity } from './entities/cashflowout.entity';

@ApiTags('cashflowouts')
@UseGuards(JwtAuthGuard)
@Controller('cashflowouts')
export class CashflowoutController {
  constructor(private readonly cashflowoutService: CashflowoutService) { }

  @Post()
  async create(
    @Body() createCashflowoutDto: CreateCashflowoutDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity = await this.cashflowoutService.create(createCashflowoutDto);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "create cashflow out successfuly",
      data
    })
  }

  @Get()
  async findAll(
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity[] = await this.cashflowoutService.findAll(req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all cashflow out successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all cashflow out failed",
        data: {}
      })
    }

  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const data: CashflowoutEntity = await this.cashflowoutService.findOne(id, req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get cashflow out by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get cashflow out by id failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCashflowoutDto: UpdateCashflowoutDto,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const data: [number, CashflowoutEntity[]] = await this.cashflowoutService.update(id, updateCashflowoutDto, req.user.sub);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update cashflow out by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflow out by id failed",
        data: {}
      })
    }

  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const data: number = await this.cashflowoutService.remove(id, req.user.sub);

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
