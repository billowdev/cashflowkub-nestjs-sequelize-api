import { Injectable } from '@nestjs/common';
import { CreateTaxplanDto } from './dto/create-taxplan.dto';
import { UpdateTaxplanDto } from './dto/update-taxplan.dto';

@Injectable()
export class TaxplanService {
  create(createTaxplanDto: CreateTaxplanDto) {
    return 'This action adds a new taxplan';
  }

  findAll() {
    return `This action returns all taxplan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxplan`;
  }

  update(id: number, updateTaxplanDto: UpdateTaxplanDto) {
    return `This action updates a #${id} taxplan`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxplan`;
  }
}
