"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const pocket_module_1 = require("./pocket/pocket.module");
const transfer_module_1 = require("./transfer/transfer.module");
const cashflowin_module_1 = require("./cashflowin/cashflowin.module");
const cashflowout_module_1 = require("./cashflowout/cashflowout.module");
const asset_module_1 = require("./asset/asset.module");
const debt_module_1 = require("./debt/debt.module");
const category_module_1 = require("./category/category.module");
const transaction_module_1 = require("./transaction/transaction.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            pocket_module_1.PocketModule,
            transfer_module_1.TransferModule,
            cashflowin_module_1.CashflowinModule,
            cashflowout_module_1.CashflowoutModule,
            asset_module_1.AssetModule,
            debt_module_1.DebtModule,
            category_module_1.CategoryModule,
            transaction_module_1.TransactionModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map