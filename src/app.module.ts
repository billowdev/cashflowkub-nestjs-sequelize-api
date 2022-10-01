import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    UserModule
  ],
})
export class AppModule { }
