import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { TRANSFER_REPOSITORY } from 'src/core/constants';
import { PocketService } from 'src/pocket/pocket.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferEntity } from './entities/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @Inject(TRANSFER_REPOSITORY) private readonly transferRepo: typeof TransferEntity,
    @Inject(PocketService) private readonly pocketService: PocketService) { }

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

      return await this.transferRepo.create<TransferEntity>(createTransferDto)
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
      return await this.transferRepo.destroy<TransferEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('destroy transfer failed')
    }
  }
}
