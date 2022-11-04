import { forwardRef, Module } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CashflowoutController } from './cashflowout.controller';
import { cashflowoutProviders } from './entities/cashflowout.providers';
import { TransactionModule } from 'src/modules/transaction/transaction.module';
import { PocketModule } from 'src/modules/pocket/pocket.module';

@Module({
  imports: [forwardRef(() => TransactionModule), PocketModule],
  controllers: [CashflowoutController],
  providers: [CashflowoutService, ...cashflowoutProviders],
  exports: [CashflowoutService]
})
export class CashflowoutModule { }
