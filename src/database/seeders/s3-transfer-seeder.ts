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
		const pocketData: Array<TransferType> = [
			{
				id: uuidv4(),
				amount: 200,
				from_pocket_id: "81755fae2-ebf9-480c-849d-6ad23db0fdd1",
				to_pocket_id: "81755fae2-ebf9-480c-849d-6ad23db0fdd0",
				user_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				amount: 400,
				from_pocket_id: "81755fae2-ebf9-480c-849d-6ad23db0fdd0",
				to_pocket_id: "81755fae2-ebf9-480c-849d-6ad23db0fdd1",
				user_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('pocket', pocketData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('pocket', null, {})
	}
};
