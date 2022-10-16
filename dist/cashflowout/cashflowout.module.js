"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashflowoutModule = void 0;
const common_1 = require("@nestjs/common");
const cashflowout_service_1 = require("./cashflowout.service");
const cashflowout_controller_1 = require("./cashflowout.controller");
const cashflowout_providers_1 = require("./entities/cashflowout.providers");
const transaction_module_1 = require("../transaction/transaction.module");
let CashflowoutModule = class CashflowoutModule {
};
CashflowoutModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => transaction_module_1.TransactionModule)],
        controllers: [cashflowout_controller_1.CashflowoutController],
        providers: [cashflowout_service_1.CashflowoutService, ...cashflowout_providers_1.cashflowoutProviders],
        exports: [cashflowout_service_1.CashflowoutService]
    })
], CashflowoutModule);
exports.CashflowoutModule = CashflowoutModule;
//# sourceMappingURL=cashflowout.module.js.map