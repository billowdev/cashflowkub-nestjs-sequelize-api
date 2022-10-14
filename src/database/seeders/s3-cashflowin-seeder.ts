'use strict';
import { DataTypes, QueryInterface, UUIDV4 } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import { Sequelize } from 'sequelize-typescript'
// const model = options.model; 

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

		const cashflowinData: Array<CashflowinType> = [
			{
				id: uuidv4(),
				desc: "income 1",
				amount: 5000,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				desc: "income 2",
				amount: 1000,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				category_id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return Promise.all([
			queryInterface.bulkInsert('cashflowin', cashflowinData, {}),

			queryInterface.bulkUpdate('pocket',
				{
					balance: 5000
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }
			),

			queryInterface.bulkUpdate('pocket',
				{
					balance: 1000
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }
			)


		])
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('cashflowin', null, {})
	}
};
