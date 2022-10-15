import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../core/constants';
import { dbConfig } from './database.config';
import { AssetEntity } from '../asset/entities/asset.entity';
import { CashflowinEntity } from '../cashflowin/entities/cashflowin.entity';
import { CashflowoutEntity } from '../cashflowout/entities/cashflowout.entity';
import { CategoryEntity } from '../category/entities/category.entity';
import { DebtEntity } from '../debt/entities/debt.entity';
import { PocketEntity } from '../pocket/entities/pocket.entity';
import { TransferEntity } from '../transfer/entities/transfer.entity';
import { UserEntity } from '../user/entities/user.entity';

export const databaseProviders = [{
   provide: SEQUELIZE,
   useFactory: async () => {
      let config;
      // let isForce: boolean;
      switch (process.env.NODE_ENV) {
         case DEVELOPMENT:
            config = dbConfig.development;
            // isForce = false
            break;
         case TEST:
            config = dbConfig.test;
            // isForce = true
            break;
         case PRODUCTION:
            config = dbConfig.production;
            // isForce = false
            break;
         default:
            config = dbConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
         UserEntity,
         CategoryEntity,
         PocketEntity,
         CashflowinEntity,
         CashflowoutEntity,
         TransferEntity,
         AssetEntity,
         DebtEntity
      ]);
      // { force: true } should be fasle in production
      await sequelize.sync({ force: true });
      return sequelize;
   },
}];