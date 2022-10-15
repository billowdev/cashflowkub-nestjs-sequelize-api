import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DEBT_REPOSITORY } from 'src/core/constants';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity } from './entities/debt.entity';

@Injectable()
export class DebtService {
  constructor(
    @Inject(DEBT_REPOSITORY) private readonly debtRepo: typeof DebtEntity
  ) { }

  async create(createDebtDto: CreateDebtDto): Promise<DebtEntity> {
    try {
      return await this.debtRepo.create<DebtEntity>(createDebtDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string) {
    try {
      return await this.debtRepo.findAll({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findOne(id: string, userId: string) {
    try {
      return await this.debtRepo.findOne({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto, userId: string) {
    try {
      return await this.debtRepo.update({
        ...updateDebtDto
      }, {
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string, userId: string) {
    try {
      return await this.debtRepo.destroy({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
