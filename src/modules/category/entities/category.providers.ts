import { CATEGORY_REPOSITORY } from '../../../common/core/constants';
import { CategoryEntity } from './category.entity';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: CategoryEntity,
  },
];
