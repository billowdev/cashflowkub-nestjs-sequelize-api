'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const debt_entity_1 = require("../../debt/entities/debt.entity");
const uuid_1 = require("uuid");
module.exports = {
    up: async (queryInterface) => {
        const debtData = [
            {
                id: (0, uuid_1.v4)(),
                type: debt_entity_1.DebtEnum.SHORT,
                amount: 200,
                interest: 1.0,
                minimum_pay: 10,
                priority: 1,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: (0, uuid_1.v4)(),
                type: debt_entity_1.DebtEnum.LONG,
                amount: 2000,
                interest: 1.0,
                minimum_pay: 100,
                priority: 2,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('debt', debtData, {});
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('debt', null, {});
    }
};
//# sourceMappingURL=s4-debt-seeder.js.map