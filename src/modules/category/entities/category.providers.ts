import { CATEGORY_REPOSITORY } from '../../../common/constants';
import { CategoryEntity } from './category.entity';

export const categoryProviders = [
  {
    provide: CATEGORY_REPOSITORY,
    useValue: CategoryEntity,
  },
];
