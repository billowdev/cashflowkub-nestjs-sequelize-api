import * as dotenv from 'dotenv';
dotenv.config();
import {
  dbDevelopmentConstants,
  dbProductionConstants,
  dbTestConstants,
  DEVELOPMENT,
  PRODUCTION,
  TEST,
} from '../core';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

let isSynchronize = false;
let envDbConfig = dbDevelopmentConstants;

const ENV = process.env.NODE_ENV;
if (ENV == DEVELOPMENT) {
  isSynchronize = true;
  envDbConfig = dbDevelopmentConstants;
} else if (ENV == PRODUCTION) {
  isSynchronize = false;
  envDbConfig = dbProductionConstants;
} else if (ENV == TEST) {
  isSynchronize = true;
  envDbConfig = dbTestConstants;
}

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  database: envDbConfig.Name,
  host: envDbConfig.Host,
  port: 5432,
  username: envDbConfig.Username,
  password: envDbConfig.Passsword,
  synchronize: isSynchronize, // make sure this not ture in production
  // in production you should be using migrations
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
};
