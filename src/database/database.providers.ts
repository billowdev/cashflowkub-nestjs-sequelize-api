import { Sequelize } from 'sequelize-typescript';
import { CashflowAttributes } from 'src/cashflow/entities/cashflow.entity';
import { CategoryAttributes } from 'src/categories/entities/category.entity';
import { PocketAttributes } from 'src/pocket/entities/pocket.entity';
import { TransferAttributes } from 'src/transfer/entities/transfer.entity';
import { UserAttributes } from 'src/user/entities/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../core/constants';
import { dbConfig } from './database.config';

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
         UserAttributes,
         CategoryAttributes,
         PocketAttributes,
         TransferAttributes,
         CashflowAttributes,


      ]);
      // { force: true } should be fasle in production
      await sequelize.sync({ force: isForce });
      return sequelize;
   },
}];