import { CASHFLOWOUT_REPOSITORY } from '../../common/core/constants';
import { CashflowoutEntity } from './cashflowout.entity';

export const cashflowoutProviders = [
  {
    provide: CASHFLOWOUT_REPOSITORY,
    useValue: CashflowoutEntity,
  },
];
