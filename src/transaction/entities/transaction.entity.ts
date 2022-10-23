import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { UserEntity } from "src/user/entities/user.entity";

export enum TransactionEnum {
	TRANSFER = 'transfer',
	CASHFLOWIN = 'cashflowin',
	CASHFLOWOUT = 'cashflowout',
}

type TransactionAttributes = {
	id: string,
	type: TransactionEnum,
	cashflowinId: string,
	cashflowoutId: string,
	transferId: string,
	userId: string,
	createdAt: Date,
	updatedAt: Date
}
type TransactionCreationAttributes = Optional<TransactionAttributes,
	'id' | 'createdAt' | 'updatedAt'>;

@Table({
	tableName: 'transaction'
})
export class TransactionEntity extends Model<TransactionAttributes, TransactionCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as transaction id',
		example: 'adada566-9708-4903-b5d3-461ab70f779a',
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
		description: 'Type of transaction',
		example: TransactionEnum.CASHFLOWIN,
		enum: TransactionEnum
	})
	@Column({
		type: DataType.ENUM({
			values: [
				TransactionEnum.CASHFLOWIN,
				TransactionEnum.CASHFLOWOUT,
				TransactionEnum.TRANSFER
			]
		}),
		allowNull: false
	})
	declare type: TransactionEnum;


	@BelongsTo(() => CashflowinEntity, { onDelete: 'casCade' })
	cashflowin: CashflowinEntity
	@ForeignKey(() => CashflowinEntity)
	@ApiProperty({
		description: 'Foreign key as Cashflowin ID',
		example: '0184cccf-26fd-47db-a636-d0ebda81fe09',
	})
	@Column({
		type: DataType.UUID,
		field: "cashflowin_id",
		allowNull: true,
		unique: true,
	})
	declare cashflowinId: string;

	@BelongsTo(() => CashflowoutEntity, { onDelete: 'casCade' })
	cashflowout: CashflowoutEntity
	@ForeignKey(() => CashflowoutEntity)
	@ApiProperty({
		description: 'Foreign key as Cashflowout ID',
		example: 'e11ee770-79ec-40b5-8726-cfd6aff1e80b',
	})
	@Column({
		type: DataType.UUID,
		field: "cashflowout_id",
		allowNull: true,
		unique: true,
	})
	declare cashflowoutId: string;

	@BelongsTo(() => TransferEntity, { onDelete: 'casCade' })
	transfer: TransferEntity
	@ForeignKey(() => TransferEntity)
	@ApiProperty({
		description: 'Foreign key as Transfer id',
		example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a',
	})
	@Column({
		type: DataType.UUID,
		field: "transfer_id",
		allowNull: true,
		unique: true,
	})
	declare transferId: string;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@ApiProperty({
		description: 'Foreign key as User ID',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false,
		unique: false,
	})
	declare userId: string;

	@ApiProperty({
		description: 'When transfer was created',
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
		description: 'When transfer was updated',
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
}


