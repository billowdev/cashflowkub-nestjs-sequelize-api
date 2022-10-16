"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferProviders = void 0;
const constants_1 = require("../../core/constants");
const transfer_entity_1 = require("./transfer.entity");
exports.transferProviders = [
    {
        provide: constants_1.TRANSFER_REPOSITORY,
        useValue: transfer_entity_1.TransferEntity
    }
];
//# sourceMappingURL=transfer.providers.js.map