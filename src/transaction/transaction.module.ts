import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './entities/transaction.providers';
import { TransferModule } from 'src/transfer/transfer.module';
import { CashflowinModule } from 'src/cashflowin/cashflowin.module';
import { CashflowoutModule } from 'src/cashflowout/cashflowout.module';

@Module({
  imports: [
    TransferModule,
    CashflowinModule,
    CashflowoutModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders]
})
export class TransactionModule { }
