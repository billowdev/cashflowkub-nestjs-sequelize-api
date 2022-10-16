import { forwardRef, Module } from '@nestjs/common';
import { CashflowinService } from './cashflowin.service';
import { CashflowinController } from './cashflowin.controller';
import { cashflowinProviders } from './entities/cashflowin.providers';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [forwardRef(() => TransactionModule),],
  controllers: [CashflowinController],
  providers: [CashflowinService, ...cashflowinProviders],
  exports: [CashflowinService]
})
export class CashflowinModule { }
