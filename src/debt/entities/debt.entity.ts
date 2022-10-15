import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";

export enum DebtEnum {
	LONG = 'long',
	SHORT = 'short',
}

type DebtAttributes = {
	id: string,
	type: DebtEnum,
	amount: number,
	interest: number,
	minimumPay: number,
	priority: number,
	userId: string,
	createdAt: Date,
	updatedAt: Date
}
type DebtCreationAttributes = Optional<DebtAttributes, 'id' | 'createdAt' | 'updatedAt'>;

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
	declare amount: number;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare interest: number;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
		field: "minimum_pay"
	})
	declare minimumPay: number;

	@ApiProperty()
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	declare priority: number;

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

	@ApiProperty()
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty()
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
