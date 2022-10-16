"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashflowinModule = void 0;
const common_1 = require("@nestjs/common");
const cashflowin_service_1 = require("./cashflowin.service");
const cashflowin_controller_1 = require("./cashflowin.controller");
const cashflowin_providers_1 = require("./entities/cashflowin.providers");
const transaction_module_1 = require("../transaction/transaction.module");
const pocket_module_1 = require("../pocket/pocket.module");
let CashflowinModule = class CashflowinModule {
};
CashflowinModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => transaction_module_1.TransactionModule), pocket_module_1.PocketModule],
        controllers: [cashflowin_controller_1.CashflowinController],
        providers: [cashflowin_service_1.CashflowinService, ...cashflowin_providers_1.cashflowinProviders],
        exports: [cashflowin_service_1.CashflowinService]
    })
], CashflowinModule);
exports.CashflowinModule = CashflowinModule;
//# sourceMappingURL=cashflowin.module.js.map