"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionProviders = void 0;
const constants_1 = require("../../core/constants");
const transaction_entity_1 = require("./transaction.entity");
exports.transactionProviders = [
    {
        provide: constants_1.TRANSACTION_REPOSITORY,
        useValue: transaction_entity_1.TransactionEntity
    }
];
//# sourceMappingURL=transaction.providers.js.map