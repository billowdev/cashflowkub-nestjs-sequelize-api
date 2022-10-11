import { Inject, Injectable } from '@nestjs/common';
import { TRANSFER_REPOSITORY } from 'src/core/constants';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { TransferEntity } from './entities/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @Inject(TRANSFER_REPOSITORY) private readonly transferRepo: typeof TransferEntity
  ) { }

  create(createTransferDto: CreateTransferDto) {
    return 'This action adds a new transfer';
  }

  findAll() {
    return `This action returns all transfer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}
