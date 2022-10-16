"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferModule = void 0;
const common_1 = require("@nestjs/common");
const transfer_service_1 = require("./transfer.service");
const transfer_controller_1 = require("./transfer.controller");
const transfer_providers_1 = require("./entities/transfer.providers");
const pocket_module_1 = require("../pocket/pocket.module");
const transaction_module_1 = require("../transaction/transaction.module");
let TransferModule = class TransferModule {
};
TransferModule = __decorate([
    (0, common_1.Module)({
        imports: [pocket_module_1.PocketModule,
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule)
        ],
        controllers: [transfer_controller_1.TransferController],
        providers: [transfer_service_1.TransferService, ...transfer_providers_1.transferProviders],
        exports: [transfer_service_1.TransferService]
    })
], TransferModule);
exports.TransferModule = TransferModule;
//# sourceMappingURL=transfer.module.js.map