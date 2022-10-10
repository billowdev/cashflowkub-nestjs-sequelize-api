import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";

export enum DebtType {
	LONG = 'long',
	SHORT = 'short',
}

@Table({
	tableName: 'debt'
})
export class DebtAttributes extends Model<DebtAttributes> {
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
		type: DataType.DECIMAL(10, 2),
	})
	value: number;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
		field: "cashflow_per_year"
	})
	cashflowPerYear: number;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [
				DebtType.LONG,
				DebtType.SHORT,
			]
		}),
		defaultValue: DebtType.SHORT,
		allowNull: false

	})
	type: DebtType;




}
