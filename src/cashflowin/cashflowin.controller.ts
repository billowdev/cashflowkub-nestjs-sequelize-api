import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/common/guards';
import { RequestWithAuth } from '../auth/dto';
import { CashflowinService } from './cashflowin.service';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';
import { UserUnauthorizedException } from '../common/swagger-document/unauthorized.document'
import {
  ApiCashflowinBulkCreateBadRequestResponse,
  ApiCashflowinBulkCreateOkResponse,
  ApiCashflowinGetAllBadRequestResponse,
  ApiCashflowinGetAllOkResponse,
  ApiCashflowinGetOneBadRequestResponse,
  ApiCashflowinGetOneOkResponse,
  ApiCashflowinGetOneParam,
  ApiCashflowinBulkCreateBody,
  ApiCashflowinCreateOkResponse,
  ApiCashflowinCreateBadRequestResponse,
  ApiCashflowinCreateBody,
  ApiCashflowinUpdateParam,
  ApiCashflowinUpdateBody,
  ApiCashflowinUpdateOkResponse,
  ApiCashflowinUpdateBadRequestResponse,
  ApiCashflowinDeleteParam,
  ApiCashflowinDeleteOkResponse,
  ApiCashflowinDeleteBadRequestResponse
} from './cashflowin.document';

@ApiBearerAuth()
@ApiTags('Cashflowins')
@UseGuards(JwtAuthGuard)
@Controller('cashflowins')
export class CashflowinController {
  constructor(private readonly cashflowinService: CashflowinService) { }


  @Get()
  @ApiOkResponse(ApiCashflowinGetAllOkResponse)
  @ApiBadRequestResponse(ApiCashflowinGetAllBadRequestResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const { sub } = req.user
    const data: CashflowinEntity[] = await this.cashflowinService.findAll(sub);
    res.status(200).send(data)
  }

  @Get(':id')
  @ApiParam(ApiCashflowinGetOneParam)
  @ApiOkResponse(ApiCashflowinGetOneOkResponse)
  @ApiBadRequestResponse(ApiCashflowinGetOneBadRequestResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: CashflowinEntity = await this.cashflowinService.findOne(id);
    res.status(200).send(data)
  }

  @Post('bulk')
  @ApiCreatedResponse(ApiCashflowinBulkCreateOkResponse)
  @ApiBadRequestResponse(ApiCashflowinBulkCreateBadRequestResponse)
  @ApiBody(ApiCashflowinBulkCreateBody)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async bulkCreate(
    @Body() createCashflowinDto: BulkCreateCashflowinDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowinEntity[] = await this.cashflowinService.bulkCreate(createCashflowinDto);
    res.status(201).send(data)
  }

  @Post()
  @ApiCreatedResponse(ApiCashflowinCreateOkResponse)
  @ApiBadRequestResponse(ApiCashflowinCreateBadRequestResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  @ApiBody(ApiCashflowinCreateBody)
  async create(
    @Body() createCashflowinDto: CreateCashflowinDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowinEntity = await this.cashflowinService.create(createCashflowinDto);
    res.status(201).send(data)
  }

  @Patch(':id')
  @ApiParam(ApiCashflowinUpdateParam)
  @ApiBody(ApiCashflowinUpdateBody)
  @ApiOkResponse(ApiCashflowinUpdateOkResponse)
  @ApiBadRequestResponse(ApiCashflowinUpdateBadRequestResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async update(
    @Param('id') id: string,
    @Body() updateCashflowinDto: UpdateCashflowinDto,
    @Res() res: FastifyReply,
    @Req() { user }: RequestWithAuth,) {
    const data: [number, CashflowinEntity[]] = await this.cashflowinService.update(
      id,
      updateCashflowinDto,
      user.sub);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update cashflowin was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflowin was failed",
      })
    }

  }

  @Delete(':id')
  @ApiParam(ApiCashflowinDeleteParam)
  @ApiOkResponse(ApiCashflowinDeleteOkResponse)
  @ApiBadRequestResponse(ApiCashflowinDeleteBadRequestResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async remove(@Param('id') id: string, @Res() res: FastifyReply, @Req() { user }: RequestWithAuth) {
    const data: number = await this.cashflowinService.remove(id, user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete cashflow was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete cashflow was failed",
      })
    }
  }
}
