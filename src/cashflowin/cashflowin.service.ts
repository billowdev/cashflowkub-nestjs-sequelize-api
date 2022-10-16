import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CASHFLOWIN_REPOSITORY } from 'src/core/constants';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@Injectable()
export class CashflowinService {
  constructor(@Inject(CASHFLOWIN_REPOSITORY) private readonly cashflowinRepo: typeof CashflowinEntity) { }

  async create(createCashflowinDto: CreateCashflowinDto): Promise<CashflowinEntity> {
    try {
      return await this.cashflowinRepo.create<CashflowinEntity>(createCashflowinDto)
    } catch (error) {
      throw new BadRequestException()
    }

  }

  async bulkCreate(createCashflowinDto: BulkCreateCashflowinDto): Promise<CashflowinEntity[]> {
    try {
      return await this.cashflowinRepo.bulkCreate<CashflowinEntity>(
        createCashflowinDto,
        {
          returning: true
        })
    } catch (error) {
      throw new BadRequestException()
    }

  }

  async findAll(userId: string): Promise<CashflowinEntity[]> {
    try {
      return await this.cashflowinRepo.findAll<CashflowinEntity>({
        where: {
          userId
        }
      })
    } catch (error) {
      throw new BadRequestException('get all cashflowin failed')
    }
  }

  async findOne(id: string): Promise<CashflowinEntity> {
    try {
      return await this.cashflowinRepo.findOne<CashflowinEntity>({
        where: { id }
      })
    } catch (error) {
      throw new BadRequestException('get cashflowin by id failed')
    }
  }

  async update(id: string, updateCashflowinDto: UpdateCashflowinDto, userId: string): Promise<[number, CashflowinEntity[]]> {
    try {
      return await this.cashflowinRepo.update<CashflowinEntity>(
        { ...updateCashflowinDto },
        { where: { id, userId }, returning: true },

      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      return await this.cashflowinRepo.destroy<CashflowinEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
