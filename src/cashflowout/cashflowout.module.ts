import { Module } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CashflowoutController } from './cashflowout.controller';
import { cashflowoutProviders } from './entities/cashflowout.providers';

@Module({
  controllers: [CashflowoutController],
  providers: [CashflowoutService, ...cashflowoutProviders],
  exports : [CashflowoutService]
})
export class CashflowoutModule { }
