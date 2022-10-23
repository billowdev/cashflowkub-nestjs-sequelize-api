import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from 'src/common/guards';
import { RequestWithAuth } from '../auth/dto';
import { CashflowinService } from './cashflowin.service';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@ApiBearerAuth()
@ApiTags('Cashflowins')
@UseGuards(JwtAuthGuard)
@Controller('cashflowins')
export class CashflowinController {
  constructor(private readonly cashflowinService: CashflowinService) { }


  @Get()
  @ApiOkResponse({
    description: 'get all cashflowins successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all cashflow in successfuly",
        data:
          [
            {
              "id": "0184cccf-26fd-47db-a636-d0ebda81fe09",
              "desc": "my cashflowin 1",
              "amount": 100,
              "userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
              "pocketId": "8407abe9-cbdf-4745-b634-681f42693ee9",
              "categoryId": "d810173c-f848-4e87-b9f0-d9f172856555",
              "createdAt": "2022-10-22T10:24:47.400Z",
              "updatedAt": "2022-10-22T10:24:47.401Z"
            }
          ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all cashflowins failed', schema: {
      example: {
        statusCode: 400,
        message: "Unauthorized"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuth,
    @Res() res: FastifyReply
  ) {
    const { sub } = req.user
    const data: CashflowinEntity[] = await this.cashflowinService.findAll(sub);
    res.send({
      statusCode: res.statusCode,
      message: "get all cashflow in successfuly",
      data
    })
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowin id that you want to request data',
    example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
  })
  @ApiOkResponse({
    description: 'get cashflowin successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all cashflow in successfuly",
        data:
        {
          "id": "0184cccf-26fd-47db-a636-d0ebda81fe09",
          "desc": "my cashflowin 1",
          "amount": 100,
          "userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          "pocketId": "8407abe9-cbdf-4745-b634-681f42693ee9",
          "categoryId": "d810173c-f848-4e87-b9f0-d9f172856555",
          "createdAt": "2022-10-22T10:24:47.400Z",
          "updatedAt": "2022-10-22T10:24:47.401Z"
        }

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get cashflowin failed', schema: {
      example: {
        statusCode: 400,
        message: "Unauthorized"
      }
    }
  })
  async findOne(@Param('id') id: string, @Res() res: FastifyReply) {
    const data: CashflowinEntity = await this.cashflowinService.findOne(id);
    res.send({
      statusCode: res.statusCode,
      message: "get cashflow in by id successfuly",
      data
    })
  }

  @Post('bulk')
  @ApiCreatedResponse({
    description: 'create cashflowins successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create bulk cashflow in successfuly",
        data: [
          {
            createdAt: new Date(),
            updatedAt: new Date(),
            id: '0184cccf-26fd-47db-a636-d0ebda81fe08',
            desc: "income 1",
            amount: 100.00,
            pocketId: '8407abe9-cbdf-4745-b634-681f42693ee9',
            categoryId: 'd810173c-f848-4e87-b9f0-d9f172856555',
            userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
          }]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'cashflowin cannot create. please try again',
    schema: {
      example: {
        statusCode: 400,
        message: "create cashflowin failed",
        error: "Bad Request"
      }
    }
  })
  @ApiBody({
    description: 'Array body of cashflowin for bulk create',
    type: CashflowinEntity,
    isArray: true
  })
  async bulkCreate(
    @Body() createCashflowinDto: BulkCreateCashflowinDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowinEntity[] = await this.cashflowinService.bulkCreate(createCashflowinDto);

    res.send({
      statusCode: res.statusCode,
      message: "create bulk cashflow in successfuly",
      data
    })
  }

  @Post()
  @ApiCreatedResponse({
    description: 'create cashflowin successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create cashflow in successfuly",
        data:
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: '0184cccf-26fd-47db-a636-d0ebda81fe07',
          desc: "income 2",
          amount: 100.00,
          pocketId: '8407abe9-cbdf-4745-b634-681f42693ee9',
          categoryId: 'd810173c-f848-4e87-b9f0-d9f172856555',
          userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'cashflowin cannot create. please try again',
    schema: {
      example: {
        statusCode: 400,
        message: "create cashflowin failed",
        error: "Bad Request"
      }
    }
  })
  async create(
    @Body() createCashflowinDto: CreateCashflowinDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowinEntity = await this.cashflowinService.create(createCashflowinDto);
    res.send({
      statusCode: res.statusCode,
      message: "create cashflow in successfuly",
      data
    })
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowin id that you want to update data',
    example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
  })
  @ApiBody({
    description: 'The body of cashflowin for update',
    schema: {
      example: {
        desc: "ค่ารถ",
        amount: 100
      }
    }
  })
  @ApiOkResponse({
    description: 'update cashflowin successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update cashflowin successfuly",
        data: [
          1
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update cashflowin failed', schema: {
      example: {
        statusCode: 400,
        message: "update cashflowin failed",
        error: "Bad Request"
      }
    }
  })
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
        message: "update cashflowin successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflowin failed",
        data: {}
      })
    }

  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowin id that you want to delete data',
    example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
  })
  @ApiOkResponse({
    description: 'delete asset successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete cashflowin successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete cashflowin failed', schema: {
      example: {
        statusCode: 400,
        message: "delete cashflowin failed",
        error: "Bad Request"
      }
    }
  })
  async remove(@Param('id') id: string, @Res() res: FastifyReply, @Req() { user }: RequestWithAuth) {
    const data: number = await this.cashflowinService.remove(id, user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "delete cashflow in by id failed",
        data: {}
      })
    }
  }
}
