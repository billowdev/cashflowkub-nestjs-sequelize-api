import { Inject, Injectable } from '@nestjs/common';
import { CASHFLOWIN_REPOSITORY } from 'src/core/constants';
import { CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@Injectable()
export class CashflowinService {
  constructor(@Inject(CASHFLOWIN_REPOSITORY) private readonly cashflowinRepo: typeof CashflowinEntity ){}

  create(createCashflowinDto: CreateCashflowinDto) {
    return 'This action adds a new cashflowin';
  }

  findAll() {
    return `This action returns all cashflowin`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cashflowin`;
  }

  update(id: string, updateCashflowinDto: UpdateCashflowinDto) {
    return `This action updates a #${id} cashflowin`;
  }

  remove(id: string) {
    return `This action removes a #${id} cashflowin`;
  }
}
