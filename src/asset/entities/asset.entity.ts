import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";

export enum AssetEnum {
	LIQUID = 'liquid',
	PRIVATE = 'private',
	INVESTMENT = 'investment',
	INTANGIBLE = 'intangible'
}

type AssetAttributes = {
	id: string,
	value: number,
	cashflowPerYear: number,
	type: AssetEnum,
	userId: string,
}
type AssetCreationAttributes = Optional<AssetAttributes, 'id'>;

@Table({
	tableName: 'asset'
})
export class AssetEntity extends Model<AssetAttributes, AssetCreationAttributes> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	declare id: string

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare value: number;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
		field: "cashflow_per_year"
	})
	declare cashflowPerYear: number;

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
	declare type: AssetEnum;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;



}
