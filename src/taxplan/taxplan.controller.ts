import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaxplanService } from './taxplan.service';
import { CreateTaxplanDto } from './dto/create-taxplan.dto';
import { UpdateTaxplanDto } from './dto/update-taxplan.dto';

@Controller('taxplan')
export class TaxplanController {
  constructor(private readonly taxplanService: TaxplanService) {}

  @Post()
  create(@Body() createTaxplanDto: CreateTaxplanDto) {
    return this.taxplanService.create(createTaxplanDto);
  }

  @Get()
  findAll() {
    return this.taxplanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxplanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaxplanDto: UpdateTaxplanDto) {
    return this.taxplanService.update(+id, updateTaxplanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxplanService.remove(+id);
  }
}
