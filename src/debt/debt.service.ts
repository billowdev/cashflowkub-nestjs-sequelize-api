import { Inject, Injectable } from '@nestjs/common';
import { DEBT_REPOSITORY } from 'src/core/constants';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity } from './entities/debt.entity';

@Injectable()
export class DebtService {
  constructor(
    @Inject(DEBT_REPOSITORY) private readonly debtRepo: typeof DebtEntity
  ) { }
  create(createDebtDto: CreateDebtDto) {
    return 'This action adds a new debt';
  }

  findAll() {
    return `This action returns all debt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debt`;
  }

  update(id: number, updateDebtDto: UpdateDebtDto) {
    return `This action updates a #${id} debt`;
  }

  remove(id: number) {
    return `This action removes a #${id} debt`;
  }
}
