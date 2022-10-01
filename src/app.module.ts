import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { dbConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UserModule],
})
export class AppModule {}
