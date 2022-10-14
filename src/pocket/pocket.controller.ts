import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pockets')
@Controller('pockets')
export class PocketController {
  constructor(private readonly pocketService: PocketService) {}

  @Post()
  create(@Body() createPocketDto: CreatePocketDto) {
    return this.pocketService.create(createPocketDto);
  }

  @Get()
  findAll() {
    return this.pocketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pocketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePocketDto: UpdatePocketDto) {
    return this.pocketService.update(+id, updatePocketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pocketService.remove(+id);
  }
}
