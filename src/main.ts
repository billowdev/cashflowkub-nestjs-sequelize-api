import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from "./common/core/config"
import { ValidationPipe } from '@nestjs/common';
import { SERVEPORT } from './common/core/constants';
import helmet, { fastifyHelmet } from '@fastify/helmet'
import { contentParser } from 'fastify-multer';

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
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: envToLogger[process.env.NODE_ENV] ?? true

    })
  );
  const prefix = 'api/v1'
  app.setGlobalPrefix(prefix);
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(prefix, app, document);

  app.useStaticAssets({
    root: join(__dirname, '..', 'public/uploaded/images/user'),
    prefix: '/api/v1/public/user/image',
  });



  await app.register(contentParser);


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

  // app.enableCors({
  //   origin: CLIENT_URL
  // });

  // By default, Fastify listens only on the localhost 127.0.0.1 interface (read more). 

  // https://docs.nestjs.com/techniques/performance
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  // If you want to accept connections on other hosts, you should specify '0.0.0.0' in the listen() call:
  await app.listen(SERVEPORT, '0.0.0.0');
}
bootstrap();
