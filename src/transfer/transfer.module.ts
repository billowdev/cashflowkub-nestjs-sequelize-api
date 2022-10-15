import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { transferProviders } from './entities/transfer.providers';

@Module({
  controllers: [TransferController],
  providers: [TransferService, ...transferProviders],
  exports : [TransferService]
})
export class TransferModule {}
