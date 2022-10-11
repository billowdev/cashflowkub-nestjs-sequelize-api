import { CASHFLOWOUT_REPOSITORY } from '../../core/constants';
import { CashflowoutAttributes } from './cashflowout.entity';

export const cashflowoutProviders = [
  {
    provide: CASHFLOWOUT_REPOSITORY,
    useValue: CashflowoutAttributes,
  },
];
