import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { requestAuthUserDto } from 'src/auth/dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/user/entities/role.enum';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity } from './entities/debt.entity';

@Roles(Role.ADMIN, Role.PREMIUM)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('debts')
@Controller('debts')
export class DebtController {
  constructor(private readonly debtService: DebtService) { }

  @Post()
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
  async findAll(
    @Req() req: requestAuthUserDto,
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
  async findOne(@Param('id') id: string, @Req() req: requestAuthUserDto,
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
  async update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto, @Req() req: requestAuthUserDto,
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
  async remove(@Param('id') id: string, @Req() req: requestAuthUserDto,
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
