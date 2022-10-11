import { Module } from '@nestjs/common';
import { DebtService } from './debt.service';
import { DebtController } from './debt.controller';
import { debtProviders } from './entities/debt.providers';

@Module({
  controllers: [DebtController],
  providers: [DebtService, ...debtProviders]
})
export class DebtModule { }
