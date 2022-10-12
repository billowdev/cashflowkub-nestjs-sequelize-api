import { CASHFLOWOUT_REPOSITORY } from '../../core/constants';
import { CashflowoutEntity } from './cashflowout.entity';

export const cashflowoutProviders = [
  {
    provide: CASHFLOWOUT_REPOSITORY,
    useValue: CashflowoutEntity,
  },
];
