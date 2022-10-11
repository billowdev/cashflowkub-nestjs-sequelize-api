import { ASSET_REPOSITORY } from '../../core/constants';
import { AssetEntity } from './asset.entity';

export const assetProviders = [
  {
    provide: ASSET_REPOSITORY,
    useValue: AssetEntity,
  },
];
