'use strict';
import { QueryInterface } from "sequelize";
import { CategoryEnum } from "src/category/entities/category.entity";

type CategotyType = {
	id: string,
	name: string,
	desc: string,
	type: CategoryEnum,
	is_custom: boolean,
	user_id: string,
	created_at: Date,
	updated_at: Date
}
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		const categoryData: Array<CategotyType> = [
			{
				id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb1",
				name: "ค่าอาหาร",
				desc: "ค่าอาหาร การกิน",
				type: CategoryEnum.EXPENSE,
				is_custom: false,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
				name: "รายรับ",
				desc: "รายรับหลัก",
				type: CategoryEnum.INCOME,
				is_custom: false,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb3",
				name: "เติมเกมส์",
				desc: "รายจ่ายไม่จำเป็น",
				type: CategoryEnum.EXPENSE,
				is_custom: true,
				user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
				created_at: new Date(),
				updated_at: new Date(),
			}
		]
		return queryInterface.bulkInsert('category', categoryData, {})
	},

	down: async (queryInterface: QueryInterface) => {
		return queryInterface.bulkDelete('category', null, {})
	}
};
