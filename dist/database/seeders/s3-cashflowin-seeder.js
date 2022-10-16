'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        const cashflowinData = [
            {
                id: "d483eacd-9255-4561-a450-9751ad5d0ca1",
                desc: "income 1",
                amount: 5000,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
                category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "d483eacd-9255-4561-a450-9751ad5d0ca2",
                desc: "income 2",
                amount: 1000,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
                category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return Promise.all([
            queryInterface.bulkInsert('cashflowin', cashflowinData, {}),
            queryInterface.bulkUpdate('pocket', {
                balance: 5000
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }),
            queryInterface.bulkUpdate('pocket', {
                balance: 1000
            }, { id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" })
        ]);
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('cashflowin', null, {});
    }
};
//# sourceMappingURL=s3-cashflowin-seeder.js.map