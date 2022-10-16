"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashflowoutProviders = void 0;
const constants_1 = require("../../core/constants");
const cashflowout_entity_1 = require("./cashflowout.entity");
exports.cashflowoutProviders = [
    {
        provide: constants_1.CASHFLOWOUT_REPOSITORY,
        useValue: cashflowout_entity_1.CashflowoutEntity,
    },
];
//# sourceMappingURL=cashflowout.providers.js.map