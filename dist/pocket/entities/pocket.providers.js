"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pocketProviders = void 0;
const constants_1 = require("../../core/constants");
const pocket_entity_1 = require("./pocket.entity");
exports.pocketProviders = [
    {
        provide: constants_1.POCKET_REPOSITORY,
        useValue: pocket_entity_1.PocketEntity
    }
];
//# sourceMappingURL=pocket.providers.js.map