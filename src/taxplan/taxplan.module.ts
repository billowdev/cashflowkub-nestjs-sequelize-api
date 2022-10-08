import { Module } from '@nestjs/common';
import { TaxplanService } from './taxplan.service';
import { TaxplanController } from './taxplan.controller';

@Module({
  controllers: [TaxplanController],
  providers: [TaxplanService]
})
export class TaxplanModule {}
