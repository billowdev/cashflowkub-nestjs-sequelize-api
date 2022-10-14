'use strict';
import { QueryInterface } from "sequelize";

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
				id: "1755fae2-ebf9-480c-849d-6ad23db0fdd0",
				name: "my wallet 1",
				balance: 0,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "1755fae2-ebf9-480c-849d-6ad23db0fdd1",
				name: "my wallet 2",
				balance: 0,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
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
