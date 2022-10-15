import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import e from 'express';
import { TRANSACTION_REPOSITORY } from 'src/core/constants';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionEntity, TransactionEnum } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly transactionRepo: typeof TransactionEntity
  ) { }

  async create(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
    const transactionType = createTransactionDto.type
    const cashflowinId = createTransactionDto.cashflowinId
    const cashflowoutId = createTransactionDto.cashflowoutId
    const transferId = createTransactionDto.transferId
    try {
      if (cashflowinId || cashflowoutId || transferId) {
        if (transactionType === TransactionEnum.CASHFLOWOUT) {
          return await this.transactionRepo.create<TransactionEntity>(createTransactionDto)
        }
        else if (transactionType === TransactionEnum.CASHFLOWIN) {
          return await this.transactionRepo.create<TransactionEntity>(createTransactionDto)
        }
        else if (transactionType === TransactionEnum.TRANSFER) {
          return await this.transactionRepo.create<TransactionEntity>(createTransactionDto)
        }
      } else {
        throw new BadRequestException('create transactions failed')
      }
    } catch (error) {
      throw new BadRequestException('create transactions failed')
    }

  }

  async findAll(userId: string): Promise<TransactionEntity[]> {
    try {
      return await this.transactionRepo.findAll<TransactionEntity>({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  findOne(id: string, userId: string) {
    return `This action returns a #${id} transaction`;
  }

  update(id: string, userId: string, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: string, userId: string) {
    return `This action removes a #${id} transaction`;
  }
}
