import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { CashflowAttributes } from "src/cashflow/entities/cashflow.entity";

export enum CategoryType {
	INCOME = 'income',
	EXPENSE = 'expense',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

@Table({
	tableName: 'categories'
})
export class CategoryAttributes extends Model<CategoryAttributes> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	id: string

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	name: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(200),
		allowNull: true

	})
	desc: string;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [CategoryType.INCOME, CategoryType.EXPENSE, CategoryType.INVESTMENT, CategoryType.SAVING]
		}),
		allowNull: false

	})
	type: CategoryType;

	// @HasMany(() => CashflowAttributes)
	// cashflows: CashflowAttributes[]
}
