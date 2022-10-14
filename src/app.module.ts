import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PocketModule } from './pocket/pocket.module';
import { TransferModule } from './transfer/transfer.module';
import { CashflowinModule } from './cashflowin/cashflowin.module';
import { CashflowoutModule } from './cashflowout/cashflowout.module';
import { AssetModule } from './asset/asset.module';
import { DebtModule } from './debt/debt.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    AuthModule,
    UserModule,
    PocketModule,
    TransferModule,
    CashflowinModule,
    CashflowoutModule,
    AssetModule,
    DebtModule,
    CategoryModule,
    TransactionModule
  ],
})
export class AppModule { }
