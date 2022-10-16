"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetProviders = void 0;
const constants_1 = require("../../core/constants");
const asset_entity_1 = require("./asset.entity");
exports.assetProviders = [
    {
        provide: constants_1.ASSET_REPOSITORY,
        useValue: asset_entity_1.AssetEntity,
    },
];
//# sourceMappingURL=asset.providers.js.map