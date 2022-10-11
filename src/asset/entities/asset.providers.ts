import { ASSET_REPOSITORY } from '../../core/constants';
import { AssetAttributes } from './asset.entity';

export const assetProviders = [
  {
    provide: ASSET_REPOSITORY,
    useValue: AssetAttributes,
  },
];
