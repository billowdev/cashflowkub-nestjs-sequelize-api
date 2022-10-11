import { Inject, Injectable } from '@nestjs/common';
import { ASSET_REPOSITORY } from 'src/core/constants';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetAttributes } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @Inject(ASSET_REPOSITORY) private readonly assetRepo: typeof AssetAttributes
  ) { }
  create(createAssetDto: CreateAssetDto) {
    return "this.assetRepo.create(createAssetDto)"
  }

  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: string) {
    return `This action returns a #${id} asset`;
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: string) {
    return `This action removes a #${id} asset`;
  }
}
