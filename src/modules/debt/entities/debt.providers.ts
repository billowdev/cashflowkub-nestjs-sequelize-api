import { DEBT_REPOSITORY } from '../../../common/core/constants';
import { DebtEntity } from './debt.entity';

export const debtProviders = [
  {
    provide: DEBT_REPOSITORY,
    useValue: DebtEntity,
  },
];
