'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        const transferData = [
            {
                id: "0733228a-dc88-4ec8-99c9-b4d82b0746a1",
                amount: 200,
                from_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
                to_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "0733228a-dc88-4ec8-99c9-b4d82b0746a2",
                amount: 400,
                from_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
                to_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return Promise.all([
            queryInterface.bulkInsert('transfer', transferData, {}),
            queryInterface.bulkUpdate('pocket', {
                balance: 4650
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }),
            queryInterface.bulkUpdate('pocket', {
                balance: 800
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }),
            queryInterface.bulkUpdate('pocket', {
                balance: 400
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }),
            queryInterface.bulkUpdate('pocket', {
                balance: 5050
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" })
        ]);
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('transfer', null, {});
    }
};
//# sourceMappingURL=s3-transfer-seeder.js.map