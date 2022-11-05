import { USER_REPOSITORY } from '../../../common/constants';
import { UserEntity } from './user.entity';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserEntity,
  },
];
