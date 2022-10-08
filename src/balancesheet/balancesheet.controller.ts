import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BalancesheetService } from './balancesheet.service';
import { CreateBalancesheetDto } from './dto/create-balancesheet.dto';
import { UpdateBalancesheetDto } from './dto/update-balancesheet.dto';

@Controller('balancesheet')
export class BalancesheetController {
  constructor(private readonly balancesheetService: BalancesheetService) {}

  @Post()
  create(@Body() createBalancesheetDto: CreateBalancesheetDto) {
    return this.balancesheetService.create(createBalancesheetDto);
  }

  @Get()
  findAll() {
    return this.balancesheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.balancesheetService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalancesheetDto: UpdateBalancesheetDto) {
    return this.balancesheetService.update(+id, updateBalancesheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.balancesheetService.remove(+id);
  }
}
