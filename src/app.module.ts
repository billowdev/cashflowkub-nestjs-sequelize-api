import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CashflowModule } from './cashflow/cashflow.module';
import { PocketModule } from './pocket/pocket.module';
import { TaxplanModule } from './taxplan/taxplan.module';
import { BalancesheetModule } from './balancesheet/balancesheet.module';
import { TransferModule } from './transfer/transfer.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    DatabaseModule,
    AuthModule,
    UserModule,
    CashflowModule,
    PocketModule,
    TaxplanModule,
    BalancesheetModule,
    TransferModule,
    CategoriesModule
  ],
})
export class AppModule { }
