import { CASHFLOWIN_REPOSITORY } from '../../core/constants';
import { CashflowinAttributes } from './cashflowin.entity';

export const cashflowinProviders = [
  {
    provide: CASHFLOWIN_REPOSITORY,
    useValue: CashflowinAttributes,
  },
];
