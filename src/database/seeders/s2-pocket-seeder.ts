'use strict';
import { QueryInterface } from "sequelize";
import { v4 as uuidv4 } from 'uuid';

type PocketType = {
	id: string,
	name: string,
	balance: number,
	user_id: string,
	created_at: Date
	updated_at: Date,
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const pocketData: Array<PocketType> = [
			{
				id: uuidv4(),
				name: "my wallet 1",
				balance: 5000,
				user_id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				name: "my wallet 2",
				balance: 200,
				user_id: "81755fae2-ebf9-480c-849d-6ad23db0fdd1",
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
