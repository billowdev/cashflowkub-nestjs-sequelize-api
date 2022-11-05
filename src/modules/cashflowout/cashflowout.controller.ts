import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { JwtAuthGuard } from 'src/common/guards';
import { ApiCashflowoutBulkCreateBadRequestResponse, ApiCashflowoutBulkCreateBody, ApiCashflowoutBulkCreatedResponse, ApiCashflowoutCreateBody, ApiCashflowoutCreatedBadRequestResponse, ApiCashflowoutCreatedResponse, ApiCashflowoutDeleteBadRequestResponse, ApiCashflowoutDeleteOkResponse, ApiCashflowoutDeleteParam, ApiCashflowoutGetAllBadRequestResponse, ApiCashflowoutGetAllOkResponse, ApiCashflowoutGetOneBadRequestResponse, ApiCashflowoutGetOneOkResponse, ApiCashflowoutGetOneParam, ApiCashflowoutUpdateBadRequestResponse, ApiCashflowoutUpdateOkResponse, ApiCashflowoutUpdateParam, ApiCashflowwoutUpdateBody } from './cashflowout.document';
import { CashflowoutService } from './cashflowout.service';
import { BulkCreateCashflowoutDto, CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity, CashflowoutEnum } from './entities/cashflowout.entity';

@ApiBearerAuth()
@ApiTags('Cashflowouts')
@UseGuards(JwtAuthGuard)
@Controller('cashflowouts')
export class CashflowoutController {
  constructor(private readonly cashflowoutService: CashflowoutService) { }

  @Post()
  @ApiBody(ApiCashflowoutCreateBody)
  @ApiCreatedResponse(ApiCashflowoutCreatedResponse)
  @ApiBadRequestResponse(ApiCashflowoutCreatedBadRequestResponse)
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

  @Post('bulk')
  @ApiBody(ApiCashflowoutBulkCreateBody)
  @ApiCreatedResponse(ApiCashflowoutBulkCreatedResponse)
  @ApiBadRequestResponse(ApiCashflowoutBulkCreateBadRequestResponse)
  async bulkCreate(
    @Body() createCashflowinDto: BulkCreateCashflowoutDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity[] = await this.cashflowoutService.bulkCreate(createCashflowinDto);
    res.send({
      statusCode: res.statusCode,
      message: "create bulk cashflowout was successfuly",
      data
    })
  }


  @Get()
  @ApiOkResponse(ApiCashflowoutGetAllOkResponse)
  @ApiBadRequestResponse(ApiCashflowoutGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity[] = await this.cashflowoutService.findAll(req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all cashflowout was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all cashflowout was failed",
        data: {}
      })
    }

  }

  @Get(':id')
  @ApiParam(ApiCashflowoutGetOneParam)
  @ApiOkResponse(ApiCashflowoutGetOneOkResponse)
  @ApiBadRequestResponse(ApiCashflowoutGetOneBadRequestResponse)
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const data: CashflowoutEntity = await this.cashflowoutService.findOne(id, req.user.sub);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get cashflowout was failed",
      })
    }
  }

  @Patch(':id')
  @ApiParam(ApiCashflowoutUpdateParam)
  @ApiOkResponse(ApiCashflowoutUpdateOkResponse)
  @ApiBadRequestResponse(ApiCashflowoutUpdateBadRequestResponse)
  @ApiBody(ApiCashflowwoutUpdateBody)
  async update(@Param('id') id: string, @Body() updateCashflowoutDto: UpdateCashflowoutDto,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const data: [number, CashflowoutEntity[]] = await this.cashflowoutService.update(id, updateCashflowoutDto, req.user.sub);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update cashflowout was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflowout was failed",
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiCashflowoutDeleteParam)
  @ApiOkResponse(ApiCashflowoutDeleteOkResponse)
  @ApiBadRequestResponse(ApiCashflowoutDeleteBadRequestResponse)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const data: number = await this.cashflowoutService.remove(id, req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id failed",
      })
    }
  }
}
