import { forwardRef, Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { transferProviders } from './entities/transfer.providers';
import { PocketModule } from 'src/pocket/pocket.module';

@Module({
  imports: [PocketModule],
  controllers: [TransferController],
  providers: [TransferService, ...transferProviders],
  exports: [TransferService]
})
export class TransferModule { }
