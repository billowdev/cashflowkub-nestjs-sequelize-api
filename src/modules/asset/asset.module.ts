import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { assetProviders } from './entities/asset.providers'
@Module({
  controllers: [AssetController],
  providers: [AssetService, ...assetProviders]
})
export class AssetModule { }
