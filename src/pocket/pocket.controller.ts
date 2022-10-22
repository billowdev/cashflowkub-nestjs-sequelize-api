import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/auth/guards';
import { PocketEntity } from './entities/pocket.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('pockets')
@Controller('pockets')
export class PocketController {
  constructor(private readonly pocketService: PocketService) { }

  @Post()
  async create(@Body() createPocketDto: CreatePocketDto,
    @Res() res: FastifyReply
  ) {
    const data: PocketEntity = await this.pocketService.create(createPocketDto);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "create pocket successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create pocket failed",
        data: {}
      })
    }
  }

  @Get()
  async findAll(
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: PocketEntity[] = await this.pocketService.findAll(userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all pocket successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all pocket failed",
        data: {}
      })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: PocketEntity = await this.pocketService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get pocket by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get pocket by id failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updatePocketDto: UpdatePocketDto,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: [number, PocketEntity[]] = await this.pocketService.update(id, updatePocketDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update pocket by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update pocket by id failed",
        data: {}
      })
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: number = await this.pocketService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete pocket by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete pocket by id failed",
        data: {}
      })
    }
  }
}
