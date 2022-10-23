import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy, LocalStrategy } from '../common/strategies';
import { RolesGuard } from '../common/guards/roles.guard';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAuthStrategy,
    RolesGuard
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
