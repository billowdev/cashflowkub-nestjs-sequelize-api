import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";

export enum AssetEnum {
	LIQUID = 'liquid',
	PRIVATE = 'private',
	INVESTMENT = 'investment',
	INTANGIBLE = 'intangible'
}

@Table({
	tableName: 'asset'
})
export class AssetAttributes extends Model<AssetAttributes> {
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
				AssetEnum.LIQUID,
				AssetEnum.PRIVATE,
				AssetEnum.INVESTMENT,
				AssetEnum.INTANGIBLE
			]
		}),
		defaultValue: AssetEnum.LIQUID, 
		allowNull: false

	})
	type: AssetEnum;




}
