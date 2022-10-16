"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtProviders = void 0;
const constants_1 = require("../../core/constants");
const debt_entity_1 = require("./debt.entity");
exports.debtProviders = [
    {
        provide: constants_1.DEBT_REPOSITORY,
        useValue: debt_entity_1.DebtEntity,
    },
];
//# sourceMappingURL=debt.providers.js.map