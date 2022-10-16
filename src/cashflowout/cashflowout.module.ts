import { forwardRef, Module } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CashflowoutController } from './cashflowout.controller';
import { cashflowoutProviders } from './entities/cashflowout.providers';
import { TransactionModule } from 'src/transaction/transaction.module';
import { PocketModule } from 'src/pocket/pocket.module';

@Module({
  imports: [forwardRef(() => TransactionModule), PocketModule],
  controllers: [CashflowoutController],
  providers: [CashflowoutService, ...cashflowoutProviders],
  exports: [CashflowoutService]
})
export class CashflowoutModule { }
