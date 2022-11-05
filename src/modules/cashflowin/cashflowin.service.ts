import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CASHFLOWIN_REPOSITORY } from 'src/common/constants';
import { PocketService } from 'src/modules/pocket/pocket.service';
import { CreateTransactionDto } from 'src/modules/transaction/dto/create-transaction.dto';
import { TransactionEnum } from 'src/modules/transaction/entities/transaction.entity';
import { TransactionService } from 'src/modules/transaction/transaction.service';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';

@Injectable()
export class CashflowinService {
  constructor(
    @Inject(CASHFLOWIN_REPOSITORY) private readonly cashflowinRepo: typeof CashflowinEntity,
    @Inject(forwardRef(() => TransactionService)) private readonly transactionService: TransactionService,
    @Inject(PocketService) private readonly pocketService: PocketService
  ) { }

  async create(createCashflowinDto: CreateCashflowinDto): Promise<CashflowinEntity> {
    try {
      const cashin = await this.cashflowinRepo.create<CashflowinEntity>(createCashflowinDto)
      const pocketId = createCashflowinDto.pocketId
      const userId = createCashflowinDto.userId
      const amount = createCashflowinDto.amount
      // update balance pocket 
      const { id, balance } = await this.pocketService.findOne(pocketId, userId)
      const newBalance = Number(balance) + Number(amount);
      const updateBalancePocket = await this.pocketService.update(id, { balance: newBalance }, userId)
      if (!updateBalancePocket[0]) {
        throw new BadRequestException('create cashflowin failed')
      }
      const cashflowinId = cashin['dataValues'].id
      const transactionData: CreateTransactionDto = {
        type: TransactionEnum.CASHFLOWIN,
        cashflowinId,
        cashflowoutId: null,
        transferId: null,
        userId
      }
      const transactionCreate = await this.transactionService.create(transactionData)
      if (!transactionCreate) throw new BadRequestException('create cashflowin failed');
      return cashin
    } catch (error) {
      throw new BadRequestException('create cashflowin failed')
    }
  }

  async bulkCreate(createCashflowinDto: BulkCreateCashflowinDto): Promise<CashflowinEntity[]> {
    try {
      const bulkCashflowin = await this.cashflowinRepo.bulkCreate<CashflowinEntity>(
        createCashflowinDto,
        {
          returning: true
        })
      // create transasction and update pocket 
      for (const cashflowin of bulkCashflowin) {
        const { id, userId, pocketId, amount } = await cashflowin['dataValues']
        const pocket = await this.pocketService.findOne(pocketId, userId)
        const presentPocketBalance = await pocket.balance
        const newBalance = await (Number(presentPocketBalance) + Number(amount))
        // update pocket balance
        await this.pocketService.update(pocketId, { balance: newBalance }, userId)
        // transaction create 
        const transactionData: CreateTransactionDto = await {
          type: TransactionEnum.CASHFLOWIN,
          cashflowinId: id,
          cashflowoutId: null,
          transferId: null,
          userId
        }
        await this.transactionService.create(transactionData)
      }

      return bulkCashflowin
    } catch (error) {
      throw new BadRequestException('create cashflowin failed')
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
      throw new BadRequestException('update cashflowin failed')
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {

      const cashflowin = await this.cashflowinRepo.findByPk(id)
      const pocketId = cashflowin.pocketId
      const cashflowinAmout = cashflowin.amount
      const pocket = await this.pocketService.findOne(pocketId, userId)
      const newBalance = Number(pocket.balance) - Number(cashflowinAmout)
      // decrease balance pocket after delete cashflowin
      await this.pocketService.update(pocketId, { balance: newBalance }, userId)
      // remove transaction
      await this.transactionService.removeByTypeActionId('cashflowin', id, userId)

      // remove cashflowin
      return await this.cashflowinRepo.destroy<CashflowinEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete cashflowin failed')
    }
  }
}
