import { CASHFLOWIN_REPOSITORY } from '../../common/core/constants';
import { CashflowinEntity } from './cashflowin.entity';

export const cashflowinProviders = [
  {
    provide: CASHFLOWIN_REPOSITORY,
    useValue: CashflowinEntity,
  },
];
