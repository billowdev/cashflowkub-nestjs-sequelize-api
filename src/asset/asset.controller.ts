import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { RequestAuthUserDto } from '../auth/dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity, AssetEnum } from './entities/asset.entity';

@ApiBearerAuth()
@Roles(Role.ADMIN, Role.PREMIUM)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Assets')
@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetController {
  constructor(private readonly assetService: AssetService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'Create assets successfuly',
    type: AssetEntity
  })
  @ApiBadRequestResponse({
    description: 'Asset cannot create. please try again',
    schema: {
      example: {
        statusCode: 400,
        message: "create asset failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: "if user is not premiumn will be forbidden error",
    schema: {
      example: {
        statusCode: 403,
        message: "Forbidden resource",
        error: "Forbidden"
      }
    }
  })
  async create(
    @Body() createAssetDto: CreateAssetDto,
    @Res() res: FastifyReply,
  ) {
    const data: AssetEntity = await this.assetService.create(createAssetDto);
    res.status(201).send({
      statusCode: res.statusCode,
      message: "Create assets successfuly",
      data
    })
  }

  @Get()
  @ApiOkResponse({
    description: 'get all assets successfuly',
    type: AssetEntity,
    isArray: true
  })
  @ApiBadRequestResponse({
    description: 'get all assets failed', schema: {
      example: {
        statusCode: 400,
        message: "Unauthorized"
      }
    }
  })
  @ApiForbiddenResponse({
    description: "if user is not premiumn will be forbidden error",
    schema: {
      example: {
        statusCode: 403,
        message: "Forbidden resource",
        error: "Forbidden"
      }
    }
  })
  async findAll(
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply) {
    const data: AssetEntity[] = await this.assetService.findAll(req.user.sub);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "get all assets successfuly",
      data
    })
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your asset id that you want to request data',
    example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
  })
  @ApiOkResponse({
    description: 'get asset successfuly',
    type: AssetEntity
  })
  @ApiBadRequestResponse({
    description: 'get asset failed', schema: {
      example: {
        statusCode: 400,
        message: "get asset failed",
        data: {}
      }
    }
  })
  @ApiForbiddenResponse({
    description: "if user is not premiumn will be forbidden error",
    schema: {
      example: {
        statusCode: 403,
        message: "Forbidden resource",
        error: "Forbidden"
      }
    }
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply) {
    const data: AssetEntity = await this.assetService.findOne(id, req.user.sub)
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get asset successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get asset failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your asset id that you want to update',
    example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
  })
  @ApiOkResponse({
    description: 'update asset successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update asset successfuly",
        data: [
          1,
          [{
            id: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216',
            desc: "asset 1",
            value: "1000.00",
            type: AssetEnum.PRIVATE,
            cashflowPerYear: "500.00",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
          }]
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update asset failed', schema: {
      example: {
        statusCode: 400,
        message: "update asset failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: "if user is not premiumn will be forbidden error",
    schema: {
      example: {
        statusCode: 403,
        message: "Forbidden resource",
        error: "Forbidden"
      }
    }
  })
  async update(@Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply,
  ) {
    const data: [number, AssetEntity[]] = await this.assetService.update(id, req.user.sub, updateAssetDto);

    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update asset successfuly",
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
  @ApiParam({
    name: 'id',
    description: 'Enter your asset id that you want to delete',
    example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
  })
  @ApiOkResponse({
    description: 'delete asset successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete cashflow in by id successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete asset failed', schema: {
      example: {
        statusCode: 400,
        message: "remove asset failed",
        error: "Bad Request"
      }
    }
  })
  @ApiForbiddenResponse({
    description: "if user is not premiumn will be forbidden error",
    schema: {
      example: {
        statusCode: 403,
        message: "Forbidden resource",
        error: "Forbidden"
      }
    }
  })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestAuthUserDto,
    @Res() res: FastifyReply,) {
    const data: number = await this.assetService.remove(id, req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete asset successfuly",
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
