import { USER_REPOSITORY } from '../../core/constants';
import { UserAttributes } from './user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserAttributes,
  },
];
