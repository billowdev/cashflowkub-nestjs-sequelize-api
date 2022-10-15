import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
import { TransferEntity } from './entities/transfer.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(
    private readonly transferService: TransferService,
  ) { }

  @Post()
  async create(@Body() createTransferDto: CreateTransferDto,
    @Res() res: FastifyReply) {
    const data: TransferEntity = await this.transferService.create(createTransferDto);
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    res.status(200).send({
      statusCode: res.statusCode,
      message: 'create transfer successfuly',
      data
    })
  }

  @Get()
  async findAll(
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity[] = await this.transferService.findAll(userId);
    res.status(200).send({
      statusCode: res.statusCode,
      message: 'get all transfer successfuly',
      data
    })
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply
  ) {
    const userId: string = req.user.sub
    const data: TransferEntity = await this.transferService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'get transfer successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'get transfer failed',
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
    const userId: string = req.user.sub
    const data: number = await this.transferService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: 'delete transfer successfuly',
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: 'delete transfer failed',
        data: {}
      })
    }
  }

}
