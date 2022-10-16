'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const asset_entity_1 = require("../../asset/entities/asset.entity");
const uuid_1 = require("uuid");
module.exports = {
    up: async (queryInterface) => {
        const assetData = [
            {
                id: (0, uuid_1.v4)(),
                type: asset_entity_1.AssetEnum.LIQUID,
                desc: "test asset",
                value: 100,
                cashflow_per_year: 200,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                type: asset_entity_1.AssetEnum.LIQUID,
                desc: "test asset 2",
                value: 3333,
                cashflow_per_year: 333,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('asset', assetData, {});
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('asset', null, {});
    }
};
//# sourceMappingURL=s4-asset-seeder.js.map