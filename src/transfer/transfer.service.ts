import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { TRANSFER_REPOSITORY } from 'src/core/constants';
import { PocketService } from 'src/pocket/pocket.service';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { TransactionEnum } from 'src/transaction/entities/transaction.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferEntity } from './entities/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @Inject(TRANSFER_REPOSITORY) private readonly transferRepo: typeof TransferEntity,
    @Inject(PocketService) private readonly pocketService: PocketService,
    @Inject(forwardRef(() => TransactionService)) private readonly transactionService: TransactionService
  ) { }

  async create(createTransferDto: CreateTransferDto): Promise<TransferEntity> {
    try {
      const userId = createTransferDto.userId
      const amountTransfer = createTransferDto.amount
      const fromPocketId = createTransferDto.fromPocketId
      const toPocketId = createTransferDto.toPocketId
      // update minus value "from pocket"
      const fromPocket = await this.pocketService.findOne(fromPocketId, userId)
      const toPocket = await this.pocketService.findOne(toPocketId, userId)
      const fromPocketBalance = fromPocket.balance
      const toPocketBalance = toPocket.balance
      const balanceFromPocket = Number(fromPocketBalance) - amountTransfer
      const balanceToPocket = Number(toPocketBalance) + amountTransfer
      // if transfer over "from pocket" balance less than 0 then return failed
      if (balanceFromPocket < 0) {
        throw new BadRequestException('create transfer failed')
      }
      // update balance between two pocket
      await this.pocketService.update(fromPocketId, { balance: balanceFromPocket }, userId)
      await this.pocketService.update(toPocketId, { balance: balanceToPocket }, userId)
      const transferData = await this.transferRepo.create<TransferEntity>(createTransferDto)
      // create transaction
      const transactionCreate: CreateTransactionDto = {
        type: TransactionEnum.TRANSFER,
        cashflowinId: null,
        cashflowoutId: null,
        transferId: transferData.id,
        userId
      }
      const transactionData = await this.transactionService.create(transactionCreate)
      if (transactionData) {
        return transferData
      } else {
        throw new BadRequestException('create cashflowout failed')
      }
    } catch (error) {
      throw new BadRequestException('Create transfer failed')
    }
  }

  async findAll(userId: string): Promise<TransferEntity[]> {
    try {
      return await this.transferRepo.findAll<TransferEntity>({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException('get all transfer failed')
    }
  }

  async findOne(id: string, userId: string): Promise<TransferEntity> {
    try {
      return await this.transferRepo.findOne<TransferEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('get transfer failed')
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      const { fromPocketId, toPocketId, amount } = await this.transferRepo.findByPk(id)
      // update pocket 
      // increse source pocket
      const fromPocket = await this.pocketService.findOne(fromPocketId, userId)
      await this.pocketService.update(fromPocketId, { balance: (Number(fromPocket.balance) + Number(amount)) }, userId)

      // decrese destination pocket
      const toPocket = await this.pocketService.findOne(toPocketId, userId)
      await this.pocketService.update(toPocketId, { balance: (Number(toPocket.balance) - Number(amount)) }, userId)

      // remove transaction
      await this.transactionService.removeByTypeActionId('transfer', id, userId)

      return await this.transferRepo.destroy<TransferEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('destroy transfer failed')
    }
  }
}
