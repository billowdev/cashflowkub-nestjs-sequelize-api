import { DEBT_REPOSITORY } from '../../core/constants';
import { DebtEntity } from './debt.entity';

export const debtProviders = [
  {
    provide: DEBT_REPOSITORY,
    useValue: DebtEntity,
  },
];
