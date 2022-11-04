import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CashflowinService } from 'src/modules/cashflowin/cashflowin.service';
import { CashflowinEntity } from 'src/modules/cashflowin/entities/cashflowin.entity';
import { CashflowoutService } from 'src/modules/cashflowout/cashflowout.service';
import { CashflowoutEntity } from 'src/modules/cashflowout/entities/cashflowout.entity';
import { TRANSACTION_REPOSITORY } from 'src/common/core/constants';
import { TransferEntity } from 'src/modules/transfer/entities/transfer.entity';
import { TransferService } from 'src/modules/transfer/transfer.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity, TransactionEnum } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly transactionRepo: typeof TransactionEntity,
    @Inject(forwardRef(() => TransferService),)
    private readonly transferService: TransferService,
    @Inject(forwardRef(() => CashflowinService))
    private readonly cashflowinService: CashflowinService,
    @Inject(forwardRef(() => CashflowoutService))
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
        where: { userId },
        include: [
          {
            model: CashflowinEntity as null,
            attributes: {
              exclude: ['userId']
            }
          },
          {
            model: CashflowoutEntity as null,
            attributes: {
              exclude: ['userId']
            }

          },
          {
            model: TransferEntity as null,
            attributes: {
              exclude: ['userId']
            }
          }
        ],
        attributes: {
          exclude: ['transferId', 'cashflowinId', 'cashflowoutId']
        }
      })
    } catch (error) {
      throw new BadRequestException('get all transaction failed')
    }
  }

  async findOne(id: string, userId: string): Promise<TransactionEntity> {
    try {
      return await this.transactionRepo.findOne<TransactionEntity>({
        where: { id, userId },
        include: [
          {
            model: CashflowinEntity as null,
            attributes: {
              exclude: ['userId']
            }
          },
          {
            model: CashflowoutEntity as null,
            attributes: {
              exclude: ['userId']
            }

          },
          {
            model: TransferEntity as null,
            attributes: {
              exclude: ['userId']
            }
          }
        ],
        attributes: {
          exclude: ['transferId', 'cashflowinId', 'cashflowoutId']
        }
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

  async removeByTypeActionId(type: string, actionId: string, userId: string): Promise<number> {
    try {
      if (type === TransactionEnum.CASHFLOWIN) {
        return await this.transactionRepo.destroy({
          where: {
            cashflowinId: actionId,
            type,
            userId
          }
        })
      } else if (type === TransactionEnum.CASHFLOWOUT) {
        return await this.transactionRepo.destroy({
          where: {
            cashflowoutId: actionId,
            type,
            userId
          }
        })
      } else {
        return await this.transactionRepo.destroy({
          where: {
            transferId: actionId,
            type,
            userId
          }
        })
      }
    } catch (error) {
      throw new BadRequestException('delete transaction failed')
    }
  }
}
