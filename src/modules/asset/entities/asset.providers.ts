import { ASSET_REPOSITORY } from '../../../common/constants';
import { AssetEntity } from './asset.entity';

export const assetProviders = [
  {
    provide: ASSET_REPOSITORY,
    useValue: AssetEntity,
  },
];
