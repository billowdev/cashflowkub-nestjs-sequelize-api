import { Module } from '@nestjs/common';
import { BalancesheetService } from './balancesheet.service';
import { BalancesheetController } from './balancesheet.controller';

@Module({
  controllers: [BalancesheetController],
  providers: [BalancesheetService]
})
export class BalancesheetModule {}
