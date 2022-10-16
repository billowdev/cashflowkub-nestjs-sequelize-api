"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashflowinProviders = void 0;
const constants_1 = require("../../core/constants");
const cashflowin_entity_1 = require("./cashflowin.entity");
exports.cashflowinProviders = [
    {
        provide: constants_1.CASHFLOWIN_REPOSITORY,
        useValue: cashflowin_entity_1.CashflowinEntity,
    },
];
//# sourceMappingURL=cashflowin.providers.js.map