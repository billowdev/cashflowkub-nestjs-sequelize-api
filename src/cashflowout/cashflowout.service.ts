import { Injectable } from '@nestjs/common';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';

@Injectable()
export class CashflowoutService {
  create(createCashflowoutDto: CreateCashflowoutDto) {
    return 'This action adds a new cashflowout';
  }

  findAll() {
    return `This action returns all cashflowout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashflowout`;
  }

  update(id: number, updateCashflowoutDto: UpdateCashflowoutDto) {
    return `This action updates a #${id} cashflowout`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashflowout`;
  }
}
