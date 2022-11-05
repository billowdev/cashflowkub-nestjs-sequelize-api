import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { FastifyReply } from 'fastify';
import { TransferEntity } from './entities/transfer.entity';
import { ApiTransferCreatedBadRequestResponse, ApiTransferCreatedBody, ApiTransferCreatedOkResponse, ApiTransferDeleteBadRequestResponse, ApiTransferDeleteOkResponse, ApiTransferDeleteParam, ApiTransferGetAllBadRequestResponse, ApiTransferGetAllOkResponse, ApiTransferGetOneBadRequestResponse, ApiTransferGetOneOkResponse, ApiTransferGetOneParam } from './transfer.document';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Transfers')
@Controller('transfers')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) { }

  @Post()
  @ApiBody(ApiTransferCreatedBody)
  @ApiCreatedResponse(ApiTransferCreatedOkResponse)
  @ApiBadRequestResponse(ApiTransferCreatedBadRequestResponse)
  async create(@Body() createTransferDto: CreateTransferDto,
    @Res() res: FastifyReply) {
    const data: TransferEntity = await this.transferService.create(createTransferDto);
    res.status(201).send({
      statusCode: res.statusCode,
      message: 'create transfer was successfuly',
      data
    })
  }

  @Get()
  @ApiOkResponse(ApiTransferGetAllOkResponse)
  @ApiBadRequestResponse(ApiTransferGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity[] = await this.transferService.findAll(userId);
    res.status(200).send({
      statusCode: res.statusCode,
      message: 'get all transfer was successfuly',
      data
    })
  }

  @Get(':id')
  @ApiParam(ApiTransferGetOneParam)
  @ApiOkResponse(ApiTransferGetOneOkResponse)
  @ApiBadRequestResponse(ApiTransferGetOneBadRequestResponse)
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity = await this.transferService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get transfer was successfuly',
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get transfer was failed',
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiTransferDeleteParam)
  @ApiOkResponse(ApiTransferDeleteOkResponse)
  @ApiBadRequestResponse(ApiTransferDeleteBadRequestResponse)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: number = await this.transferService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'delete transfer was successfuly',
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'delete transfer was failed',
      })
    }
  }

}
