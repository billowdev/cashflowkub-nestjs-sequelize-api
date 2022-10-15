import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionProviders } from './entities/transaction.providers';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, ...transactionProviders]
})
export class TransactionModule {}
