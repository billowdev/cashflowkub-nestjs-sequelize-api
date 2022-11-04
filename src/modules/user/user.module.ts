import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './entities/user.providers';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
  exports: [UserService]
})
export class UserModule { }
