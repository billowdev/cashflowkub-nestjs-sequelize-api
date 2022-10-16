"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const transaction_controller_1 = require("./transaction.controller");
const transaction_providers_1 = require("./entities/transaction.providers");
const transfer_module_1 = require("../transfer/transfer.module");
const cashflowin_module_1 = require("../cashflowin/cashflowin.module");
const cashflowout_module_1 = require("../cashflowout/cashflowout.module");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => transfer_module_1.TransferModule),
            (0, common_1.forwardRef)(() => cashflowin_module_1.CashflowinModule),
            (0, common_1.forwardRef)(() => cashflowout_module_1.CashflowoutModule)
        ],
        controllers: [transaction_controller_1.TransactionController],
        providers: [transaction_service_1.TransactionService, ...transaction_providers_1.transactionProviders],
        exports: [transaction_service_1.TransactionService]
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map