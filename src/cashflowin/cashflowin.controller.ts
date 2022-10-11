import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashflowinService } from './cashflowin.service';
import { CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';

@Controller('cashflowins')
export class CashflowinController {
  constructor(private readonly cashflowinService: CashflowinService) {}

  @Post()
  create(@Body() createCashflowinDto: CreateCashflowinDto) {
    return this.cashflowinService.create(createCashflowinDto);
  }

  @Get()
  findAll() {
    return this.cashflowinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashflowinService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashflowinDto: UpdateCashflowinDto) {
    return this.cashflowinService.update(id, updateCashflowinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashflowinService.remove(id);
  }
}
