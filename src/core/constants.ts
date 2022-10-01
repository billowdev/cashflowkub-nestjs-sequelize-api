import * as dotenv from 'dotenv';
dotenv.config();

// configuration

export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const SERVEPORT = process.env.PORT;

export const dbDevelopmentConstants = {
  Name: process.env.DEVDBNAME,
  Username: process.env.DEVDBUSERNAME,
  Passsword: process.env.DEVDBPASSWORD,
  Host: process.env.DEVDBHOST,
  Port: process.env.DBPORT
};

export const dbProductionConstants = {
  Name: process.env.PRODDBNAME,
  Username: process.env.PRODDBUSERNAME,
  Passsword: process.env.PRODDBPASSWORD,
  Host: process.env.PRODDBHOST,
  Port: process.env.DBPORT
};

export const dbTestConstants = {
  Name: process.env.TESTDBNAME,
  Username: process.env.TESTDBUSERNAME,
  Passsword: process.env.TESTDBPASSWORD,
  Host: process.env.TESTDBHOST,
  Port: process.env.DBPORT
};
