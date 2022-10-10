import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from "./core/config"
import { ValidationPipe } from '@nestjs/common';
import { SERVEPORT } from './core/constants';


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
  const prefix = '/api/v1'
  app.setGlobalPrefix(prefix);

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(prefix, app, document);

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
