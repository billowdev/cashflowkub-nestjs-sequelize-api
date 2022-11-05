import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { RequestWithAuth } from 'src/modules/auth/dto';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/common/guards';
import { PocketEntity } from './entities/pocket.entity';
import { ApiPocketCreatedBadRequestResponse, ApiPocketCreatedBody, ApiPocketCreatedOkResponse, ApiPocketDeleteBadRequestResponse, ApiPocketDeleteOkResponse, ApiPocketDeleteParam, ApiPocketGetAllBadRequestResponse, ApiPocketGetAllOkResponse, ApiPocketGetOneBadRequestResponse, ApiPocketGetOneOkResponse, ApiPocketGetOneParam, ApiPocketUpadateBadRequestResponse, ApiPocketUpadateBody, ApiPocketUpadateOkResponse, ApiPocketUpdateParam } from './pocket.document';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Pockets')
@Controller('pockets')
export class PocketController {
  constructor(private readonly pocketService: PocketService) { }

  @Post()
  @ApiBody(ApiPocketCreatedBody)
  @ApiCreatedResponse(ApiPocketCreatedOkResponse)
  @ApiBadRequestResponse(ApiPocketCreatedBadRequestResponse)
  async create(@Body() createPocketDto: CreatePocketDto,
    @Res() res: FastifyReply
  ) {
    const data: PocketEntity = await this.pocketService.create(createPocketDto);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "create pocket was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create pocket was failed",
        data: {}
      })
    }
  }

  @Get()
  @ApiOkResponse(ApiPocketGetAllOkResponse)
  @ApiBadRequestResponse(ApiPocketGetAllBadRequestResponse)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: PocketEntity[] = await this.pocketService.findAll(userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all pocket was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all pocket was failed",
        data: {}
      })
    }
  }

  @Get(':id')
  @ApiParam(ApiPocketGetOneParam)
  @ApiOkResponse(ApiPocketGetOneOkResponse)
  @ApiBadRequestResponse(ApiPocketGetOneBadRequestResponse)
  async findOne(@Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: PocketEntity = await this.pocketService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get pocket was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get pocket was failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  @ApiParam(ApiPocketUpdateParam)
  @ApiBody(ApiPocketUpadateBody)
  @ApiOkResponse(ApiPocketUpadateOkResponse)
  @ApiBadRequestResponse(ApiPocketUpadateBadRequestResponse)
  async update(
    @Param('id') id: string, @Body() updatePocketDto: UpdatePocketDto,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: [number, PocketEntity[]] = await this.pocketService.update(id, updatePocketDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update pocket was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update pocket was failed",
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiPocketDeleteParam)
  @ApiOkResponse(ApiPocketDeleteOkResponse)
  @ApiBadRequestResponse(ApiPocketDeleteBadRequestResponse)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: number = await this.pocketService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete pocket was successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete pocket was failed",
      })
    }
  }
}
