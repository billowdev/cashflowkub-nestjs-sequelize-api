import { CASHFLOWIN_REPOSITORY } from '../../../common/constants';
import { CashflowinEntity } from './cashflowin.entity';

export const cashflowinProviders = [
  {
    provide: CASHFLOWIN_REPOSITORY,
    useValue: CashflowinEntity,
  },
];
