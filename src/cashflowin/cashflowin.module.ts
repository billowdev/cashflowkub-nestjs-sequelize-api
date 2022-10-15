import { Module } from '@nestjs/common';
import { CashflowinService } from './cashflowin.service';
import { CashflowinController } from './cashflowin.controller';
import { cashflowinProviders } from './entities/cashflowin.providers';

@Module({
  controllers: [CashflowinController],
  providers: [CashflowinService, ...cashflowinProviders],
  exports : [CashflowinService]
})
export class CashflowinModule {}
