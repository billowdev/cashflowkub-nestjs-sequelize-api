import { Inject, Injectable } from '@nestjs/common';
import { CASHFLOWOUT_REPOSITORY } from 'src/core/constants';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity } from './entities/cashflowout.entity';

@Injectable()
export class CashflowoutService {
  constructor(@Inject(CASHFLOWOUT_REPOSITORY) private readonly cashflowoutRepo: typeof CashflowoutEntity) { }
  create(createCashflowoutDto: CreateCashflowoutDto) {
    return 'This action adds a new cashflowout';
  }

  findAll() {
    return `This action returns all cashflowout`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cashflowout`;
  }

  update(id: string, updateCashflowoutDto: UpdateCashflowoutDto) {
    return `This action updates a #${id} cashflowout`;
  }

  remove(id: string) {
    return `This action removes a #${id} cashflowout`;
  }
}
