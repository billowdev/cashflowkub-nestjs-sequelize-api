import { QueryInterface } from "sequelize/types";
import { UUIDV4 } from "sequelize";
import { TransactionEnum } from "src/transaction/entities/transaction.entity";

module.exports = {
	up: async (queryInterface: QueryInterface, DataType) => {
		return Promise.all([
			queryInterface.createTable('transaction', {
				id: {
					type: DataType.UUID,
					defaultValue: UUIDV4,
					unique: true,
					allowNull: false,
					primaryKey: true,
				},
				type: {
					type: DataType.ENUM({
						values: [
							TransactionEnum.CASHFLOWIN,
							TransactionEnum.CASHFLOWOUT,
							TransactionEnum.TRANSFER
						]
					}),
					allowNull: false
				},
				cashflowin_id: {
					type: DataType.UUID,
					field: "cashflowin_id",
					allowNull: true,
					unique: false,
					references: {
						model: 'cashlowin',
						key: 'id',
					},
				},
				cashflowout_id: {
					type: DataType.UUID,
					field: "cashflowout_id",
					allowNull: true,
					unique: false,
					references: {
						model: 'cashlowout',
						key: 'id',
					},
				},
				transfer_id: {
					type: DataType.UUID,
					field: "transfer_id",
					allowNull: true,
					unique: false,
					references: {
						model: 'transfer',
						key: 'id',
					},
				},
				user_id: {
					type: DataType.UUID,
					field: "user_id",
					allowNull: true,
					unique: false,
					references: {
						model: 'user',
						key: 'id',
					},
				},
				created_at: {
					type: DataType.DATE,
					field: "created_at",
					defaultValue: new Date()
				},
				updated_at: {
					type: DataType.DATE,
					field: "updated_at",
					defaultValue: new Date()
				}
			})
		])
	},

	down: async (queryInterface: QueryInterface, Sequelize) => {
		return await queryInterface.dropTable('transaction');
	}
};
