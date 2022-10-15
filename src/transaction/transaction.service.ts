import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CashflowinService } from 'src/cashflowin/cashflowin.service';
import { CashflowoutService } from 'src/cashflowout/cashflowout.service';
import { TRANSACTION_REPOSITORY } from 'src/core/constants';
import { TransferService } from 'src/transfer/transfer.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity, TransactionEnum } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly transactionRepo: typeof TransactionEntity,
    @Inject(TransferService)
    private readonly transferService: TransferService,
    @Inject(CashflowinService)
    private readonly cashflowinService: CashflowinService,
    @Inject(CashflowoutService)
    private readonly cashflowoutService: CashflowoutService,

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
      throw new BadRequestException('get all transaction failed')
    }
  }

  async findOne(id: string, userId: string): Promise<TransactionEntity> {
    try {
      return await this.transactionRepo.findOne<TransactionEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('get transaction failed')
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      const transactionData = await this.transactionRepo.findByPk(id)
      if (transactionData.type === TransactionEnum.CASHFLOWIN) {
        await this.cashflowinService.remove(transactionData.cashflowinId, userId)
      } else if (transactionData.type === TransactionEnum.CASHFLOWOUT) {
        await this.cashflowoutService.remove(transactionData.cashflowoutId, userId)
      } else {
        await this.transferService.remove(transactionData.transferId, userId)
      }
      return await this.transactionRepo.destroy<TransactionEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete transaction failed')
    }
  }
}
