import { Module } from '@nestjs/common';
import { PocketService } from './pocket.service';
import { PocketController } from './pocket.controller';
import { pocketProviders } from './entities/pocket.providers';

@Module({
  controllers: [PocketController],
  providers: [PocketService, ...pocketProviders],
  exports: [PocketService]
})
export class PocketModule { }
