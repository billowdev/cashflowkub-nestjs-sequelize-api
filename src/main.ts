import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from "./common/config"
import { ValidationPipe } from '@nestjs/common';
import { CLIENT_URL_DEV, CLIENT_URL_DEV_2, CLIENT_URL_PROD, SERVEPORT } from './common/constants';
import helmet, { fastifyHelmet } from '@fastify/helmet'
import fmp from 'fastify-multipart';

import { join } from 'path';

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

  const fastifyAdapter = new FastifyAdapter({
    logger: envToLogger[process.env.NODE_ENV] ?? true,

  })
  fastifyAdapter.register(fmp,
    {
      limits: {
        fieldNameSize: 100, // Max field name size in bytes
        fieldSize: 1000000, // Max field value size in bytes
        fields: 10,         // Max number of non-file fields
        fileSize: 100,      // For multipart forms, the max file size
        files: 1,           // Max number of file fields
        headerPairs: 2000,   // Max number of header key=>value pairs
      },
    })

  const app: NestFastifyApplication = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
   
  );


  const prefix = 'api/v1'
  app.setGlobalPrefix(prefix);
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(prefix, app, document);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public/uploaded/images/user'),
    prefix: '/api/v1/public/user/image',
  });

  await app.register(helmet)
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          'cdn.jsdelivr.net',
          'fonts.googleapis.com',
        ],
        fontSrc: [`'self'`, 'fonts.gstatic.com'],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
      },
    },
  });

  // If you are not going to use CSP at all, you can use this:
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });

  const corsWhitelist = [
    CLIENT_URL_DEV,
    CLIENT_URL_PROD,
    CLIENT_URL_DEV_2
  ]
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || corsWhitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })

  // By default, Fastify listens only on the localhost 127.0.0.1 interface (read more). 
  // https://docs.nestjs.com/techniques/performance
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call:
  await app.listen(SERVEPORT, '0.0.0.0');
}
bootstrap();
