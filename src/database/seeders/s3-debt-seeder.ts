'use strict';
import { QueryInterface } from "sequelize";
import { DebtEnum } from "src/debt/entities/debt.entity";
import { v4 as uuidv4 } from 'uuid';

type DebtType = {
	id: string,
	type: DebtEnum,
	amount: number,
	interest: number,
	minimum_pay: number,
	priority: number,
	user_id: string,
	created_at: Date
	updated_at: Date,
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const assetData: Array<DebtType> = [
			{
				id: uuidv4(),
				type: DebtEnum.SHORT,
				amount: 200,
				interest: 1.0,
				minimum_pay: 10,
				priority: 1,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: uuidv4(),
				type: DebtEnum.LONG,
				amount: 2000,
				interest: 1.0,
				minimum_pay: 100,
				priority: 2,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('debt', assetData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('debt', null, {})
	}
};
