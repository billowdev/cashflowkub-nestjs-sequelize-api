import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize/types";

export enum CashflowoutEnum {
	FIXED = 'fixed',
	VARIABLE = 'variable',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

@Table({
	tableName: "cashflowout"
})
export class CashflowoutAttributes extends Model<CashflowoutAttributes> {
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
		type: DataType.STRING(150),
	})
	desc: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	amount: number;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [
				CashflowoutEnum.VARIABLE,
				CashflowoutEnum.FIXED,
				CashflowoutEnum.SAVING,
				CashflowoutEnum.INVESTMENT
			]
		}),
		allowNull: false

	})
	type: CashflowoutEnum;

}
