import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { RequestWithAuthDto } from 'src/auth/dto';
import { JwtAuthGuard } from 'src/common/guards';
import { CashflowoutService } from './cashflowout.service';
import { BulkCreateCashflowoutDto, CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity, CashflowoutEnum } from './entities/cashflowout.entity';

@ApiBearerAuth()
@ApiTags('Cashflowouts')
@UseGuards(JwtAuthGuard)
@Controller('cashflowouts')
export class CashflowoutController {
  constructor(private readonly cashflowoutService: CashflowoutService) { }

  @Post()
  @ApiCreatedResponse({
    description: 'create cashflowout successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create cashflowout successfuly",
        data:
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          id: 'e11ee770-79ec-40b5-8726-cfd6aff1e80b',
          desc: "expense 1",
          amount: 100.00,
          type: CashflowoutEnum.VARIABLE,
          pocketId: '8407abe9-cbdf-4745-b634-681f42693ee9',
          categoryId: 'd810173c-f848-4e87-b9f0-d9f172856551',
          userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
        }
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'cashflowout cannot create. please try again',
    schema: {
      example: {
        statusCode: 400,
        message: "create cashflowout failed",
        error: "Bad Request"
      }
    }
  })
  async create(
    @Body() createCashflowoutDto: CreateCashflowoutDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity = await this.cashflowoutService.create(createCashflowoutDto);
    res.status(200).send({
      statusCode: res.statusCode,
      message: "create cashflow out successfuly",
      data
    })
  }

  @Post('bulk')
  @ApiCreatedResponse({
    description: 'create bulk cashflowout successfuly',
    schema: {
      example: {
        statusCode: 201,
        message: "create bulk cashflowout successfuly",
        data:
          [
            {
              createdAt: new Date(),
              updatedAt: new Date(),
              id: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b',
              desc: "expense 1",
              amount: 120.00,
              type: CashflowoutEnum.VARIABLE,
              pocketId: '8407abe9-cbdf-4745-b634-681f42693ee9',
              categoryId: 'd810173c-f848-4e87-b9f0-d9f172856551',
              userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
            }
          ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'cashflowout cannot bulk create. please try again',
    schema: {
      example: {
        statusCode: 400,
        message: "bulk create cashflowout failed",
        error: "Bad Request"
      }
    }
  })
  @ApiBody({
    description: 'Array body of cashflowout for bulk create',
    type: CashflowoutEntity,
    isArray: true
  })
  async bulkCreate(
    @Body() createCashflowinDto: BulkCreateCashflowoutDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity[] = await this.cashflowoutService.bulkCreate(createCashflowinDto);
    res.send({
      statusCode: res.statusCode,
      message: "create bulk cashflowout successfuly",
      data
    })
  }


  @Get()
  @ApiOkResponse({
    description: 'get all cashflowout successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get all cashflowout successfuly",
        data:
          [{
            id: "e11ee770-79ec-40b5-8726-cfd6aff1e81b",
            desc: "my cashflowout 1",
            amount: 100,
            type: CashflowoutEnum.VARIABLE,
            userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
            pocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
            categoryId: "d810173c-f848-4e87-b9f0-d9f172856551",
            createdAt: "2022-10-22T10:24:47.400Z",
            updatedAt: "2022-10-22T10:24:47.401Z"
          }]

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get all cashflowout failed', schema: {
      example: {
        statusCode: 400,
        message: "Unauthorized"
      }
    }
  })
  async findAll(
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const data: CashflowoutEntity[] = await this.cashflowoutService.findAll(req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get all cashflowout successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get all cashflowout failed",
        data: {}
      })
    }

  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowout id that you want to request data',
    example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
  })
  @ApiOkResponse({
    description: 'get cashflowout was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "get cashflowout was successfuly",
        data:
        {
          id: "e11ee770-79ec-40b5-8726-cfd6aff1e81b",
          desc: "my cashflowout 1",
          amount: 100,
          type: CashflowoutEnum.VARIABLE,
          userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
          pocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
          categoryId: "d810173c-f848-4e87-b9f0-d9f172856551",
          createdAt: "2022-10-22T10:24:47.400Z",
          updatedAt: "2022-10-22T10:24:47.401Z"
        }

      }
    }
  })
  @ApiBadRequestResponse({
    description: 'get cashflowout was failed', schema: {
      example: {
        statusCode: 400,
        message: "Unauthorized"
      }
    }
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply) {
    const data: CashflowoutEntity = await this.cashflowoutService.findOne(id, req.user.sub);
    if (data) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "get cashflowout was successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "get cashflowout was failed",
        data: {}
      })
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowout id that you want to update data',
    example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
  })
  @ApiOkResponse({
    description: 'update cashflowout was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "update cashflowout was successfuly",
        data: [
          1
        ]
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'update cashflowout was failed', schema: {
      example: {
        statusCode: 400,
        message: "update cashflowout was failed",
        error: "Bad Request"
      }
    }
  })
  @ApiBody({
    description: 'The body of cashflowout for update',
    schema: {
      example: {
        desc: "ค่ารถ",
        amount: 100,
        type: CashflowoutEnum.FIXED
      }
    }

  })
  async update(@Param('id') id: string, @Body() updateCashflowoutDto: UpdateCashflowoutDto,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const data: [number, CashflowoutEntity[]] = await this.cashflowoutService.update(id, updateCashflowoutDto, req.user.sub);
    if (data[0]) {
      res.status(200).send({
        statusCode: res.statusCode,
        message: "update cashflow out by id successfuly",
        data
      })
    } else {
      res.status(400).send({
        statusCode: res.statusCode,
        message: "update cashflow out by id failed",
        data: {}
      })
    }

  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Enter your cashflowout id that you want to delete data',
    example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
  })
  @ApiOkResponse({
    description: 'delete cashflowout was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete cashflowout was successfuly",
        data: 1
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'delete cashflowout was failed', schema: {
      example: {
        statusCode: 400,
        message: "delete cashflowout was failed",
        error: "Bad Request"
      }
    }
  })
  async remove(
    @Param('id') id: string,
    @Req() req: RequestWithAuthDto,
    @Res() res: FastifyReply
  ) {
    const data: number = await this.cashflowoutService.remove(id, req.user.sub);

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
