import { DEBT_REPOSITORY } from '../../../common/constants';
import { DebtEntity } from './debt.entity';

export const debtProviders = [
  {
    provide: DEBT_REPOSITORY,
    useValue: DebtEntity,
  },
];
