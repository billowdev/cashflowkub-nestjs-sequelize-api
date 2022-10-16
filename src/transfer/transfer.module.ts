import { forwardRef, Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { transferProviders } from './entities/transfer.providers';
import { PocketModule } from 'src/pocket/pocket.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [PocketModule,
    forwardRef(() => TransactionModule)
  ],
  controllers: [TransferController],
  providers: [TransferService, ...transferProviders],
  exports: [TransferService]
})
export class TransferModule { }
