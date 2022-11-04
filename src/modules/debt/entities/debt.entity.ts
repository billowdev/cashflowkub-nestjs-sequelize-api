import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "src/modules/user/entities/user.entity";

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
	@ApiProperty({
		description: 'Primary key as debt id',
		example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e',
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
		description: 'Amount of debt',
		example: 2000.00
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@ApiProperty({
		description: 'Interest of debt (percent)',
		example: 3.0
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare interest: number;

	@ApiProperty({
		description: 'Minimum pay for debt',
		example: 100.00
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
		field: "minimum_pay"
	})
	declare minimumPay: number;

	@ApiProperty({
		description: 'The number of priority of debt',
		example: 1,
		nullable: true
	})
	@Column({
		type: DataType.INTEGER,
		allowNull: true
	})
	declare priority: number;

	@ApiProperty({
		description: 'Type of debt',
		default: DebtEnum.SHORT,
		enum: DebtEnum
	})
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

	@ApiProperty({
		description: 'When debt was created',
		nullable: false,
		format: Date(),
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty({
		description: 'When category was updated',
		nullable: false,
		format: Date(),
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
	@ApiProperty({
		description: 'Foreign key as user id',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;


}
