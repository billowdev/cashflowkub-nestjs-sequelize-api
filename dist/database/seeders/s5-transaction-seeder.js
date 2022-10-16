'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
module.exports = {
    up: async (queryInterface) => {
        const transactionData = [
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e1",
                type: transaction_entity_1.TransactionEnum.CASHFLOWIN,
                cashflowin_id: "d483eacd-9255-4561-a450-9751ad5d0ca1",
                cashflowout_id: null,
                transfer_id: null,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e2",
                type: transaction_entity_1.TransactionEnum.CASHFLOWIN,
                cashflowin_id: "d483eacd-9255-4561-a450-9751ad5d0ca2",
                cashflowout_id: null,
                transfer_id: null,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e3",
                type: transaction_entity_1.TransactionEnum.CASHFLOWOUT,
                cashflowin_id: null,
                cashflowout_id: "2b57822d-827a-4e02-8d18-47dd36b0da01",
                transfer_id: null,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e4",
                type: transaction_entity_1.TransactionEnum.CASHFLOWOUT,
                cashflowin_id: null,
                cashflowout_id: "2b57822d-827a-4e02-8d18-47dd36b0da02",
                transfer_id: null,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e5",
                type: transaction_entity_1.TransactionEnum.TRANSFER,
                cashflowin_id: null,
                cashflowout_id: null,
                transfer_id: "0733228a-dc88-4ec8-99c9-b4d82b0746a1",
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "db5d7045-0981-4d89-9db1-a10e64bd99e6",
                type: transaction_entity_1.TransactionEnum.TRANSFER,
                cashflowin_id: null,
                cashflowout_id: null,
                transfer_id: "0733228a-dc88-4ec8-99c9-b4d82b0746a2",
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('transaction', transactionData, {});
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('transaction', null, {});
    }
};
//# sourceMappingURL=s5-transaction-seeder.js.map