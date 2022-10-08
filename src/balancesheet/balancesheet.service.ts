import { Injectable } from '@nestjs/common';
import { CreateBalancesheetDto } from './dto/create-balancesheet.dto';
import { UpdateBalancesheetDto } from './dto/update-balancesheet.dto';

@Injectable()
export class BalancesheetService {
  create(createBalancesheetDto: CreateBalancesheetDto) {
    return 'This action adds a new balancesheet';
  }

  findAll() {
    return `This action returns all balancesheet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} balancesheet`;
  }

  update(id: number, updateBalancesheetDto: UpdateBalancesheetDto) {
    return `This action updates a #${id} balancesheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} balancesheet`;
  }
}
