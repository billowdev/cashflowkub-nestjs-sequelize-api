'use strict';
import { QueryInterface } from "sequelize";
import { DebtEnum } from "src/debt/entities/debt.entity";
import { TransactionEnum } from "src/transaction/entities/transaction.entity";
import { v4 as uuidv4 } from 'uuid';

type TransactionType = {
	id: string,
	type: TransactionEnum,
	cashflowin_id: string,
	cashflowout_id: string,
	transfer_id: string,
	user_id: string,
	created_at: Date
	updated_at: Date,
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const transactionData: Array<TransactionType> = [
			{
				id: uuidv4(),
				type: TransactionEnum.CASHFLOWIN,
				cashflowin_id: "d483eacd-9255-4561-a450-9751ad5d0ca1",
				cashflowout_id: null,
				transfer_id: null,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: TransactionEnum.CASHFLOWIN,
				cashflowin_id: "d483eacd-9255-4561-a450-9751ad5d0ca2",
				cashflowout_id: null,
				transfer_id: null,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: TransactionEnum.CASHFLOWOUT,
				cashflowin_id: null,
				cashflowout_id: "2b57822d-827a-4e02-8d18-47dd36b0da01",
				transfer_id: null,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: TransactionEnum.CASHFLOWOUT,
				cashflowin_id: null,
				cashflowout_id: "2b57822d-827a-4e02-8d18-47dd36b0da02",
				transfer_id: null,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: TransactionEnum.TRANSFER,
				cashflowin_id: null,
				cashflowout_id: null,
				transfer_id: "0733228a-dc88-4ec8-99c9-b4d82b0746a1",
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: TransactionEnum.TRANSFER,
				cashflowin_id: null,
				cashflowout_id: null,
				transfer_id: "0733228a-dc88-4ec8-99c9-b4d82b0746a2",
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('transaction', transactionData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('transaction', null, {})
	}
};
