import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";

export enum DebtEnum {
	LONG = 'long',
	SHORT = 'short',
}

type DebtAttributes = {
	id: string,
	value: number,
	cashflowPerYear: number,
	type: DebtEnum,
	userId: string
}
type DebtCreationAttributes = Optional<DebtAttributes, 'id'>;

@Table({
	tableName: 'debt'
})
export class DebtEntity extends Model<DebtAttributes, DebtCreationAttributes> {
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
				DebtEnum.LONG,
				DebtEnum.SHORT,
			]
		}),
		defaultValue: DebtEnum.SHORT,
		allowNull: false

	})
	declare type: DebtEnum;

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
