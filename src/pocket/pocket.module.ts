import { Module } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { PocketController } from './pocket.controller';

@Module({
  controllers: [PocketController],
  providers: [PocketService]
})
export class PocketModule {}
