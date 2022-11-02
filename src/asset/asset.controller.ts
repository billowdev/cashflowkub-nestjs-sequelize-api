import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserUnauthorizedException } from 'src/common/swagger-document/unauthorized.document';
import { Role } from 'src/user/entities/role.enum';
import { RequestWithAuth } from '../auth/dto';
import { JwtAuthGuard, RolesGuard } from '../common/guards';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity } from './entities/asset.entity';
import {
  ApiAssetCreateResponse,
  ApiAssetCreateBadRequestResponse,
  ApiAssetGetAllOkResponse,
  ApiAssetGetAllBadRequestResponse,
  ApiAssetGetOneParam,
  ApiAssetGetOneOkResponse,
  ApiAssetGetOneBadRequestResponse,
  ApiAssetUpdateOkResponse,
  ApiAssetUpdateParam,
  ApiAssetUpdateBadRequestResponse,
  ApiAssetDeleteOkResponse,
  ApiAssetDeleteBadRequestResponse,
  ApiAssetDeleteParam
} from './asset.document';
import { ForbiddenResponse } from 'src/common/swagger-document/forbidden.document';

@ApiBearerAuth()
@Roles(Role.ADMIN, Role.PREMIUM)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Assets')
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) { }

  @Post()
  @ApiCreatedResponse(ApiAssetCreateResponse)
  @ApiBadRequestResponse(ApiAssetCreateBadRequestResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async create(
    @Body() createAssetDto: CreateAssetDto,
    @Res() res: FastifyReply,
  ) {
    const data: AssetEntity = await this.assetService.create(createAssetDto);
    res.status(201).send(data)
  }

  @Get()
  @ApiOkResponse(ApiAssetGetAllOkResponse)
  @ApiBadRequestResponse(ApiAssetGetAllBadRequestResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const data: AssetEntity[] = await this.assetService.findAll(req.user.sub);
    res.status(200).send(data)
  }

  @Get(':id')
  @ApiParam(ApiAssetGetOneParam)
  @ApiOkResponse(ApiAssetGetOneOkResponse)
  @ApiBadRequestResponse(ApiAssetGetOneBadRequestResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply) {
    const data: AssetEntity = await this.assetService.findOne(id, req.user.sub)
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get asset successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get asset failed"
      })
    }
  }

  @Patch(':id')
  @ApiParam(ApiAssetUpdateParam)
  @ApiOkResponse(ApiAssetUpdateOkResponse)
  @ApiBadRequestResponse(ApiAssetUpdateBadRequestResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async update(@Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply,
  ) {
    const data: [number, AssetEntity[]] = await this.assetService.update(id, req.user.sub, updateAssetDto);

    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update asset successfuly",
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update asset failed",
      })
    }
  }

  @Delete(':id')
  @ApiParam(ApiAssetDeleteParam)
  @ApiOkResponse(ApiAssetDeleteOkResponse)
  @ApiBadRequestResponse(ApiAssetDeleteBadRequestResponse)
  @ApiForbiddenResponse(ForbiddenResponse)
  @ApiUnauthorizedResponse(UserUnauthorizedException)
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply,) {
    const data: number = await this.assetService.remove(id, req.user.sub);
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete asset failed",
      })
    }
  }
}
