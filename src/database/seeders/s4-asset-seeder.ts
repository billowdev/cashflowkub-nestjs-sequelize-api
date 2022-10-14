'use strict';
import { QueryInterface } from "sequelize";
import { AssetEnum } from "src/asset/entities/asset.entity";
import { v4 as uuidv4 } from 'uuid';

type AssetType = {
	id: string,
	value: number,
	desc: string,
	cashflow_per_year: number,
	type: AssetEnum,
	user_id: string,
	created_at: Date
	updated_at: Date,
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const assetData: Array<AssetType> = [
			{
				id: uuidv4(),
				type: AssetEnum.LIQUID,
				desc: "test asset",
				value: 100,
				cashflow_per_year: 200,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: AssetEnum.LIQUID,
				desc: "test asset 2",
				value: 3333,
				cashflow_per_year: 333,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('asset', assetData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('asset', null, {})
	}
};
