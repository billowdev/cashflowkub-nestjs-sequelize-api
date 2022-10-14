'use strict';
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

type TransferType = {
	id: string,
	amount: number,
	from_pocket_id: string,
	to_pocket_id: string,
	user_id: string,
	created_at: Date
	updated_at: Date,
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const transferData: Array<TransferType> = [
			{
				id: uuidv4(),
				amount: 200,
				from_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				to_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				amount: 400,
				from_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
				to_pocket_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return Promise.all([
			queryInterface.bulkInsert('transfer', transferData, {}),
			queryInterface.bulkUpdate('pocket',
				{
					balance: 4650
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }
			),

			queryInterface.bulkUpdate('pocket',
				{
					balance: 800
				},
				{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }
			),

			queryInterface.bulkUpdate('pocket',
			{
				balance: 400
			},
			{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1" }
		),

		queryInterface.bulkUpdate('pocket',
			{
				balance: 5050
			},
			{ id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0" }
		)
		])
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('transfer', null, {})
	}
};
