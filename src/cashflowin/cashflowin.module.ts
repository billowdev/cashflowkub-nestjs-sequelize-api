import { Module } from '@nestjs/common';
import { CashflowinService } from './cashflowin.service';
import { CashflowinController } from './cashflowin.controller';

@Module({
  controllers: [CashflowinController],
  providers: [CashflowinService]
})
export class CashflowinModule {}
