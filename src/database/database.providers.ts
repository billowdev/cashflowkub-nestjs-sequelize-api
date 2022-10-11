import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../core/constants';
import { dbConfig } from './database.config';
import { AssetAttributes } from '../asset/entities/asset.entity';
import { CashflowinAttributes } from '../cashflowin/entities/cashflowin.entity';
import { CashflowoutAttributes } from '../cashflowout/entities/cashflowout.entity';
import { CategoryAttributes } from '../category/entities/category.entity';
import { DebtAttributes } from '../debt/entities/debt.entity';
import { PocketAttributes } from '../pocket/entities/pocket.entity';
import { TransferAttributes } from '../transfer/entities/transfer.entity';
import { UserEntity } from '../user/entities/user.entity';

export const databaseProviders = [{
   provide: SEQUELIZE,
   useFactory: async () => {
      let config;
      let isForce: boolean;
      switch (process.env.NODE_ENV) {
         case DEVELOPMENT:
            config = dbConfig.development;
            isForce = true
            break;
         case TEST:
            config = dbConfig.test;
            isForce = true
            break;
         case PRODUCTION:
            config = dbConfig.production;
            isForce = false
            break;
         default:
            config = dbConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
         UserEntity,
         CategoryAttributes,
         PocketAttributes,
         CashflowinAttributes,
         CashflowoutAttributes,
         TransferAttributes,
         AssetAttributes,
         DebtAttributes
      ]);
      // { force: true } should be fasle in production
      await sequelize.sync({ force: false });
      return sequelize;
   },
}];