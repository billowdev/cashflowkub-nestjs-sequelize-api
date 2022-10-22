import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RequestWithAuthDto } from 'src/auth/dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/user/entities/role.enum';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity, DebtEnum } from './entities/debt.entity';

@ApiBearerAuth()
@Roles(Role.ADMIN, Role.PREMIUM)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('debts')
@Controller('debts')
export class DebtController {
  constructor(private readonly debtService: DebtService) { }

  @Post()
  @ApiBody({
    description: 'The body for create debt',
    schema: {
      example: {
        type: DebtEnum.SHORT,
        amount: 1000,
        interest: 2.0,
        minimumPay: 100,
        priority: 1,
        userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
      }
    }
  })
  @ApiCreatedResponse({
    description: 'create debt was successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create debt was successfuly",
        data:
        {
          statusCode: 201,
          message: "create debt was successfuly",
          data: {
            id: "f05c0ecb-3aa2-4335-9987-553fcb4f365e",
            type: DebtEnum.SHORT,
            amount: 1000,
            interest: 2.0,
            minimumPay: 100,
            priority: 1,
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0118a",
            createdAt: "2022-10-16T10:36:07.496Z",
            updatedAt: "2022-10-16T10:36:07.496Z"
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'create debt was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "create debt was failed",
        error: "Bad Request"
      }
    }
  })
  async create(@Body() createDebtDto: CreateDebtDto,
    @Res() res: FastifyReply) {
    const data: DebtEntity = await this.debtService.create(createDebtDto);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "create debt successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "create debt failed",
        data: {}
      })
    }
  }

  @Get()
  @ApiCreatedResponse({
    description: 'get all debt was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all debt was successfuly",
        data:
        {
          statusCode: 200,
          message: "get all debt was successfuly",
          data: [
            {
              id: "f05c0ecb-3aa2-4335-9987-553fcb4f365e",
              type: DebtEnum.SHORT,
              amount: 1000,
              interest: 2.0,
              minimumPay: 100,
              priority: 1,
              userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0118a",
              createdAt: "2022-10-16T10:36:07.496Z",
              updatedAt: "2022-10-16T10:36:07.496Z"
            }
          ]
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all debt was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get all debt was failed",
        error: "Bad Request"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuthDto,
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
  @ApiParam({
    name: 'id',
    description: 'Enter your debt id that you want to request data',
    example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
  })
  @ApiCreatedResponse({
    description: 'get debt was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get debt was successfuly",
        data:
        {
          statusCode: 200,
          message: "get debt was successfuly",
          data:
          {
            id: "f05c0ecb-3aa2-4335-9987-553fcb4f365e",
            type: DebtEnum.SHORT,
            amount: 1000,
            interest: 2.0,
            minimumPay: 100,
            priority: 1,
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0118a",
            createdAt: "2022-10-16T10:36:07.496Z",
            updatedAt: "2022-10-16T10:36:07.496Z"
          }

        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get debt was failed',
    schema: {
      example: {
        statusCode: 400,
        message: "get debt was failed",
        error: "Bad Request"
      }
    }
  })
  async findOne(@Param('id') id: string, @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: DebtEntity = await this.debtService.findOne(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get debt by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get debt by id failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your debt id that you want to update data',
    example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
  })
  @ApiBody({
    description: 'The body of debt for update',
    schema: {
      example: {
        type: DebtEnum.SHORT,
        amount: 1000,
        interest: 2.0,
        minimumPay: 100,
        priority: 2,
        userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
      }
    }
  })
  @ApiOkResponse({
    description: 'update debt was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update debt was successfuly",
        data: [
          1
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update debt was failed', schema: {
      example: {
        statusCode: 400,
        message: "update debt was failed",
        error: "Bad Request"
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto, @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: [number, DebtEntity[]] = await this.debtService.update(id, updateDebtDto, userId);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update debt by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update debt by id failed",
        data: {}
      })
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your debt id that you want to delete data',
    example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
  })
  @ApiOkResponse({
    description: 'delete debt was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete debt was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete debt was failed', schema: {
      example: {
        statusCode: 400,
        message: "update debt was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(@Param('id') id: string, @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const userId: string = req.user.sub
    const data: number = await this.debtService.remove(id, userId);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete debt by id successfuly",
        data: {}
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete debt by id failed",
        data: {}
      })
    }
  }
}
