import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DEBT_REPOSITORY } from 'src/common/constants';
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
      throw new BadRequestException('create debt failed')
    }
  }

  async findAll(userId: string): Promise<DebtEntity[]> {
    try {
      return await this.debtRepo.findAll<DebtEntity>({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException('get all debt failed')
    }
  }

  async findOne(id: string, userId: string):Promise<DebtEntity> {
    try {
      return await this.debtRepo.findOne<DebtEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('get debt failed')
    }
  }

  async update(id: string, updateDebtDto: UpdateDebtDto, userId: string) : Promise<[number, DebtEntity[]]>{
    try {
      return await this.debtRepo.update<DebtEntity>({
        ...updateDebtDto
      }, {
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('update debt failed')
    }
  }

  async remove(id: string, userId: string):Promise<number> {
    try {
      return await this.debtRepo.destroy<DebtEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
