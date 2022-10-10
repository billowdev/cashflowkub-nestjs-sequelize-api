import { Module } from '@nestjs/common';
import { CashflowoutService } from './cashflowout.service';
import { CashflowoutController } from './cashflowout.controller';

@Module({
  controllers: [CashflowoutController],
  providers: [CashflowoutService]
})
export class CashflowoutModule {}
