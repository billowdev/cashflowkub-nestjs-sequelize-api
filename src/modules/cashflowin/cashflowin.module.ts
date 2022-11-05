import { forwardRef, Module } from '@nestjs/common';
import { CashflowinService } from './cashflowin.service';
import { CashflowinController } from './cashflowin.controller';
import { cashflowinProviders } from './entities/cashflowin.providers';
import { TransactionModule } from 'src/modules/transaction/transaction.module';
import { PocketModule } from 'src/modules/pocket/pocket.module';

@Module({
  imports: [forwardRef(() => TransactionModule), PocketModule],
  controllers: [CashflowinController],
  providers: [CashflowinService, ...cashflowinProviders],
  exports: [CashflowinService]
})
export class CashflowinModule { }
