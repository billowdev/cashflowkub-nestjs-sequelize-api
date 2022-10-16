import { forwardRef, Module } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CashflowoutController } from './cashflowout.controller';
import { cashflowoutProviders } from './entities/cashflowout.providers';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [forwardRef(() => TransactionModule)],
  controllers: [CashflowoutController],
  providers: [CashflowoutService, ...cashflowoutProviders],
  exports: [CashflowoutService]
})
export class CashflowoutModule { }
