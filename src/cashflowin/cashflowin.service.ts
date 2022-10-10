import { Injectable } from '@nestjs/common';
import { CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';

@Injectable()
export class CashflowinService {
  create(createCashflowinDto: CreateCashflowinDto) {
    return 'This action adds a new cashflowin';
  }

  findAll() {
    return `This action returns all cashflowin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashflowin`;
  }

  update(id: number, updateCashflowinDto: UpdateCashflowinDto) {
    return `This action updates a #${id} cashflowin`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashflowin`;
  }
}
