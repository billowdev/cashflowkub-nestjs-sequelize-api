import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CASHFLOWIN_REPOSITORY } from 'src/core/constants';
import { CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@Injectable()
export class CashflowinService {
  constructor(@Inject(CASHFLOWIN_REPOSITORY) private readonly cashflowinRepo: typeof CashflowinEntity) { }

  async create(createCashflowinDto: CreateCashflowinDto, userId: string): Promise<CashflowinEntity> {
    try {
      const cashflowin = new CashflowinEntity()
      cashflowin.amount = createCashflowinDto.amount
      cashflowin.userId = userId
      cashflowin.pocketId = createCashflowinDto.pocketId
      cashflowin.desc = createCashflowinDto.desc
      cashflowin.categoryId = createCashflowinDto.categoryId
      return await this.cashflowinRepo.create<CashflowinEntity>(cashflowin['dataValues'])
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

  async update(id: string, updateCashflowinDto: UpdateCashflowinDto, userId: string) {
    try {
      return await this.cashflowinRepo.update(
        { ...updateCashflowinDto },
        { where: { id, userId } }
      )
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string, userId: string) {
    try {
      return await this.cashflowinRepo.destroy({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
