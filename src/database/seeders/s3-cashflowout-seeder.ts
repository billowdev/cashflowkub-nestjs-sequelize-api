'use strict';
import { QueryInterface } from "sequelize";
import { CashflowoutEnum } from "src/modules/cashflowout/entities/cashflowout.entity";
import { v4 as uuidv4 } from 'uuid';

type CashflowinType = {
	id: string,
	desc: string,
	amount: number,
	type: CashflowoutEnum,
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
				id: "2b57822d-827a-4e02-8d18-47dd36b0da01",
				desc: "expense 1",
				amount: 150,
				type: CashflowoutEnum.VARIABLE,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb1",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "2b57822d-827a-4e02-8d18-47dd36b0da02",
				desc: "expense 2",
				amount: 400,
				type: CashflowoutEnum.VARIABLE,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb3",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return Promise.all([
			queryInterface.bulkInsert('cashflowout', cashflowoutData, {}),

			queryInterface.bulkUpdate('pocket',
				{
					balance: 4850
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }
			),

			queryInterface.bulkUpdate('pocket',
				{
					balance: 600
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }
			)
		])
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('cashflowout', null, {})
	}
};
