import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TRANSFER_REPOSITORY } from 'src/core/constants';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferEntity } from './entities/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @Inject(TRANSFER_REPOSITORY) private readonly transferRepo: typeof TransferEntity
  ) { }

  async create(createTransferDto: CreateTransferDto): Promise<TransferEntity> {
    try {
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
