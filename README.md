## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### package
<pre>
yarn add @nestjs/swagger dotenv pg pg-hstore sequelize sequelize-typescript @nestjs/config
yarn add class-transformer class-validator 
yarn add @fastify/helmet
yarn add @nestjs/passport @nestjs/jwt passport passport-local passport-jwt
yarn add argon2
yarn add @nestjs/sequelize
yarn add uuid


yarn add -D @types/passport-jwt @types/passport-local
yarn add -D @types/sequelize
</pre>


### migration
https://github.com/sequelize/cli/pull/987#issuecomment-1153105548

<pre>
npx sequelize-cli@6.2.0 db:migrate
npx sequelize-cli migration:generate --name create-user
</pre>

### FASTIFY
<pre>
yarn add @nestjs/platform-fastify @fastify/static fastify
----
main.ts
----

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: envToLogger[process.env.NODE_ENV] ?? true
    })
  );

</pre>

### Seeder
<pre>
npx sequelize-cli seed:create --name user-seeder --seeders-path ./src/database/seeders/
</pre>

<pre>
  npx sequelize-cli db:drop                           Drop database specified by configuration
  npx sequelize-cli init                              Initializes project
  npx sequelize-cli init:config                       Initializes configuration
  npx sequelize-cli init:migrations                   Initializes migrations
  npx sequelize-cli init:models                       Initializes models
  npx sequelize-cli init:seeders                      Initializes seeders
  npx sequelize-cli migration:generate                Generates a new migration file
  npx sequelize-cli migration:create                  Generates a new migration file
  npx sequelize-cli model:generate                    Generates a model and its migration
  npx sequelize-cli model:create                      Generates a model and its migration
 
  npx sequelize-cli seed:generate                     Generates a new seed file
  npx sequelize-cli seed:create                       Generates a new seed file

</pre>

##### Running Seeds
<pre>
npx sequelize-cli db:seed:all
</pre>


##### Undoing Seeds
<pre>
Seeders can be undone if they are using any storage. There are two commands available for that:

If you wish to undo the most recent seed:

  npx sequelize-cli db:seed:undo

If you wish to undo a specific seed:

  npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

If you wish to undo all seeds:

  npx sequelize-cli db:seed:undo:all
</pre>