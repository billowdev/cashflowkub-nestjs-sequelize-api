import * as dotenv from 'dotenv';
dotenv.config();

// configuration
export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const SERVEPORT = process.env.PORT

// serve url
export const CLIENT_URL_DEV = process.env.CLIENT_URL_DEV
export const CLIENT_URL_DEV_2 = process.env.CLIENT_URL_DEV_2
export const CLIENT_URL_PROD = process.env.CLIENT_URL_PROD