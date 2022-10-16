'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        const pocketData = [
            {
                id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
                name: "my wallet 1",
                balance: 0,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
                name: "my wallet 1",
                balance: 0,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "1755fae2-ebf9-480c-849d-6ad23db0fdd2",
                name: "my wallet 2",
                balance: 0,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('pocket', pocketData, {});
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('pocket', null, {});
    }
};
//# sourceMappingURL=s2-pocket-seeder.js.map