import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RequestWithAuth } from 'src/auth/dto';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { Role } from 'src/user/entities/role.enum';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity, DebtEnum } from './entities/debt.entity';
import { ApiDebtCreateBody, ApiDebtCreatedBadRequestResponse, ApiDebtCreatedOkResponse, ApiDebtDeleteBadRequestResponse, ApiDebtDeleteOkResponse, ApiDebtDeleteParam, ApiDebtGetAllBadRequestResponse, ApiDebtGetAllOkResponse, ApiDebtGetOneBadRequestResponse, ApiDebtGetOneOkResponse, ApiDebtGetOneParam, ApiDebtUpdateBadRequestResponse, ApiDebtUpdateBody, ApiDebtUpdateOkResponse, ApiDebtUpdateParam } from './debt.document';

@ApiBearerAuth()
@Roles(Role.ADMIN, Role.PREMIUM)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Debts')
@Controller('debts')
export class DebtController {
  constructor(private readonly debtService: DebtService) { }

  @Post()
  @ApiBody(ApiDebtCreateBody)
  @ApiCreatedResponse(ApiDebtCreatedOkResponse)
  @ApiBadRequestResponse(ApiDebtCreatedBadRequestResponse)
  async create(@Body() createDebtDto: CreateDebtDto,
    @Res() res: FastifyReply) {
    const data: DebtEntity = await this.debtService.create(createDebtDto);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create debt failed",
      })
    }
  }

  @Get()
  @ApiOkResponse(ApiDebtGetAllOkResponse)
  @ApiBadRequestResponse(ApiDebtGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: DebtEntity[] = await this.debtService.findAll(userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all debt successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all debt failed",
        data: {}
      })
    }
  }

  @Get(':id')
  @ApiParam(
    ApiDebtGetOneParam)
  @ApiOkResponse(ApiDebtGetOneOkResponse)
  @ApiBadRequestResponse(ApiDebtGetOneBadRequestResponse)
  async findOne(@Param('id') id: string, @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: DebtEntity = await this.debtService.findOne(id, userId);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get debt was failed",
      })
    }
  }

  @Patch(':id')
  @ApiParam(ApiDebtUpdateParam)
  @ApiBody(ApiDebtUpdateBody)
  @ApiOkResponse(ApiDebtUpdateOkResponse)
  @ApiBadRequestResponse(ApiDebtUpdateBadRequestResponse)
  async update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto, @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: [number, DebtEntity[]] = await this.debtService.update(id, updateDebtDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update debt by id successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update debt by id failed",
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiDebtDeleteParam)
  @ApiOkResponse(ApiDebtDeleteOkResponse)
  @ApiBadRequestResponse(ApiDebtDeleteBadRequestResponse)

  async remove(@Param('id') id: string, @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: number = await this.debtService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete debt by id successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete debt by id failed",
      })
    }
  }
}
