import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CASHFLOWOUT_REPOSITORY } from 'src/core/constants';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { TransactionEnum } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity } from './entities/cashflowout.entity';

@Injectable()
export class CashflowoutService {
  constructor(
    @Inject(CASHFLOWOUT_REPOSITORY) private readonly cashflowoutRepo: typeof CashflowoutEntity,
    @Inject(forwardRef(() => TransactionService)) private readonly transactionService: TransactionService
  ) { }

  async create(createCashflowoutDto: CreateCashflowoutDto): Promise<CashflowoutEntity> {
    try {
      const cashflowoutData = await this.cashflowoutRepo.create<CashflowoutEntity>(createCashflowoutDto)
      const { id, userId } = cashflowoutData['dataValues']
      const transactionCreate: CreateTransactionDto = {
        type: TransactionEnum.CASHFLOWOUT,
        cashflowinId: null,
        cashflowoutId: id,
        transferId: null,
        userId
      }
      const transactionData = await this.transactionService.create(transactionCreate)
      if (transactionData) {
        return cashflowoutData
      } else {
        throw new BadRequestException('create cashflowout failed')
      }
    } catch (error) {
      throw new BadRequestException('create cashflowout failed')
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

      // remove transaction 
      const isTransactionRemove = await this.transactionService.removeByTypeActionId('cashflowout', id, userId)
      if (!isTransactionRemove) {
        throw new BadRequestException('remove cashflowout transaction failed')
      }
      // remove cashflowin
      return await this.cashflowoutRepo.destroy<CashflowoutEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete cashflowout failed')
    }
  }
}
