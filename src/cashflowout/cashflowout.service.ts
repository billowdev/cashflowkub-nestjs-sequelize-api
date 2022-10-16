import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CASHFLOWOUT_REPOSITORY } from 'src/core/constants';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity } from './entities/cashflowout.entity';

@Injectable()
export class CashflowoutService {
  constructor(@Inject(CASHFLOWOUT_REPOSITORY) private readonly cashflowoutRepo: typeof CashflowoutEntity) { }

  async create(createCashflowoutDto: CreateCashflowoutDto): Promise<CashflowoutEntity> {
    try {
      return await this.cashflowoutRepo.create<CashflowoutEntity>(createCashflowoutDto)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string): Promise<CashflowoutEntity[]> {
    try {
      return await this.cashflowoutRepo.findAll<CashflowoutEntity>({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException('get all cashflowout failed')
    }
  }

  async findOne(id: string, userId: string): Promise<CashflowoutEntity> {
    try {
      return await this.cashflowoutRepo.findOne<CashflowoutEntity>({
        where: {
          id, userId
        }
      })
    } catch (error) {
      throw new BadRequestException('get cashflowout failed')
    }
  }

  async update(id: string, updateCashflowoutDto: UpdateCashflowoutDto, userId: string): Promise<[number, CashflowoutEntity[]]> {
    try {
      return await this.cashflowoutRepo.update<CashflowoutEntity>({
        ...updateCashflowoutDto
      },
        {
          where: { id, userId }
        })
    } catch (error) {
      throw new BadRequestException('update cashflowout failed')
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      return await this.cashflowoutRepo.destroy<CashflowoutEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete cashflowout failed')
    }
  }
}
