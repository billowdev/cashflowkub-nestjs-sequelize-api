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
type TransactionCreationAttributes = Optional<TransactionAttributes, 'id'>;

@Table({
	tableName: 'transaction'
})
export class TransactionEntity extends Model<TransactionAttributes, TransactionCreationAttributes> {
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
	@Column({
		type: DataType.UUID,
		field: "cashflowin_id",
		allowNull: true,
		unique: false,
	})
	declare cashflowinId: string;

	@BelongsTo(() => CashflowoutEntity, { onDelete: 'casCade' })
	cashflowout: CashflowoutEntity
	@ForeignKey(() => CashflowoutEntity)
	@Column({
		type: DataType.UUID,
		field: "cashflowout_id",
		allowNull: true,
		unique: false,
	})
	declare cashflowoutId: string;

	@BelongsTo(() => TransferEntity, { onDelete: 'casCade' })
	transfer: TransferEntity
	@ForeignKey(() => TransferEntity)
	@Column({
		type: DataType.UUID,
		field: "transfer_id",
		allowNull: true,
		unique: false,
	})
	declare transferId: string;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;

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
}


