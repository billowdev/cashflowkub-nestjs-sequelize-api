import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from "./core/config"
import { ValidationPipe } from '@nestjs/common';
import { SERVEPORT, CLIENT_URL } from './core/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prefix = '/api/v1'
  app.setGlobalPrefix(prefix);

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(prefix, app, document);

  app.enableCors({
    origin: CLIENT_URL
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(SERVEPORT);
}
bootstrap();
