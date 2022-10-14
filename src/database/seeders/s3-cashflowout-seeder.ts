'use strict';
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

type CashflowinType = {
	id: string,
	desc: string,
	amount: number,
	user_id: string,
	pocket_id: string,
	category_id: string,
	created_at: Date
	updated_at: Date,
}


module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const cashflowoutData: Array<CashflowinType> = [
			{
				id: uuidv4(),
				desc: "expense 1",
				amount: 150,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb1",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				desc: "expense 2",
				amount: 400,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb3",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('cashflowout', cashflowoutData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('cashflowout', null, {})
	}
};
