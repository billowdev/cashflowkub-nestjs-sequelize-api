import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";
import { v4 as uuidv4 } from 'uuid';

export enum AssetEnum {
	LIQUID = 'liquid',
	PRIVATE = 'private',
	INVESTMENT = 'investment',
	INTANGIBLE = 'intangible'
}

type AssetAttributes = {
	id: string,
	value: number,
	desc: string,
	cashflowPerYear: number,
	type: AssetEnum,
	userId: string,
	createdAt: Date
	updatedAt: Date,
}
type AssetCreationAttributes = Optional<AssetAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
	tableName: 'asset'
})
export class AssetEntity extends Model<AssetAttributes, AssetCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as Asset ID',
		example: uuidv4(),
		uniqueItems: true,
		nullable: false
	})
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	declare id: string

	@ApiProperty({
		description: 'The description of asset',
		example: "my asset 1",
		nullable: true
	})
	@Column({
		type: DataType.STRING(200),
	})
	declare desc: string

	@ApiProperty({
		description: 'The value of asset',
		example: 1000.00,
		nullable: false
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare value: number;

	@ApiProperty({
		description: 'The cashflow per year of asset',
		example: 333.00,
		nullable: false
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
		field: "cashflow_per_year"
	})
	declare cashflowPerYear: number;

	@ApiProperty({
		description: 'The type of asset',
		example: AssetEnum.LIQUID,
		default: AssetEnum.LIQUID,
		nullable: false
	})
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

	@ApiProperty({
		description: 'When asset was created',
		nullable: false,
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty({
		description: 'When asset was updated',
		nullable: false,
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "updated_at",
		defaultValue: new Date()
	})
	declare updatedAt: Date;

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
