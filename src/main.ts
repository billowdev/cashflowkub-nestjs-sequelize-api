import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SERVEPORT } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Personal Finance Management System')
    .setDescription('API for Personal Finance Management System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/document', app, document);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )

  await app.listen(SERVEPORT);
}
bootstrap();
