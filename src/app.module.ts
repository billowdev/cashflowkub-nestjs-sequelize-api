import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { PocketModule } from './modules/pocket/pocket.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { CashflowinModule } from './modules/cashflowin/cashflowin.module';
import { CashflowoutModule } from './modules/cashflowout/cashflowout.module';
import { AssetModule } from './modules/asset/asset.module';
import { DebtModule } from './modules/debt/debt.module';
import { CategoryModule } from './modules/category/category.module';
import { TransactionModule } from './modules/transaction/transaction.module';

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
