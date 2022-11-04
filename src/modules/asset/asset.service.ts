import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ASSET_REPOSITORY } from 'src/common/core/constants';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @Inject(ASSET_REPOSITORY) private readonly assetRepo: typeof AssetEntity
  ) { }
  async create(createAssetDto: CreateAssetDto): Promise<AssetEntity> {
    try {
      return await this.assetRepo.create<AssetEntity>(createAssetDto);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(userId: string): Promise<AssetEntity[]> {
    try {
      return await this.assetRepo.findAll<AssetEntity>({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException('get all assets failed')
    }
  }

  async findOne(id: string, userId): Promise<AssetEntity> {
    try {
      return await this.assetRepo.findOne<AssetEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('get asset by id failed');
    }
  }

  async update(id: string, userId: string, updateAssetDto: UpdateAssetDto): Promise<[number, AssetEntity[]]> {
    try {
      return await this.assetRepo.update<AssetEntity>(
        { ...updateAssetDto },
        {
          where: { id, userId },
          returning: true,
        })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      return await this.assetRepo.destroy<AssetEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete asset failed')
    }
  }
}
