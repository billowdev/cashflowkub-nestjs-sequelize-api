import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';

@Controller('cashflowouts')
export class CashflowoutController {
  constructor(private readonly cashflowoutService: CashflowoutService) {}

  @Post()
  create(@Body() createCashflowoutDto: CreateCashflowoutDto) {
    return this.cashflowoutService.create(createCashflowoutDto);
  }

  @Get()
  findAll() {
    return this.cashflowoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashflowoutService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashflowoutDto: UpdateCashflowoutDto) {
    return this.cashflowoutService.update(id, updateCashflowoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashflowoutService.remove(id);
  }
}
