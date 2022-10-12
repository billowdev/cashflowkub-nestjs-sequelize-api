import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from '../auth/dto';
import { JwtAuthGuard } from '../auth/guards';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) { }

  @Post()
  async create(
    @Body() createAssetDto: CreateAssetDto,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply,
  ) {
    const userId = req.user.sub
    const data = await this.assetService.create({ ...createAssetDto, userId });
    res.status(200).send({
      statusCode: res.statusCode,
      message: "create assets successfuly",
      data
    })
  }

  @Get()
  async findAll(
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const data = await this.assetService.findAll(req.user.sub);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "get all assets successfuly",
      data
    })
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply) {
    const data = await this.assetService.findOne(id, req.user.sub)
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get asset by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get asset by id failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply,
  ) {
    const data = await this.assetService.update(id, req.user.sub, updateAssetDto);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update asset successfully",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update asset failed",
        data: {}
      })
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: requestAuthUserDto,
    @Res() res: FastifyReply,) {
    const data = await this.assetService.remove(id, req.user.sub);
    if (data) {
      res.status(204).send({
        statusCode: res.statusCode,
        message: "delete asset successfully",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete asset failed",
        data: {}
      })
    }
  }
}
