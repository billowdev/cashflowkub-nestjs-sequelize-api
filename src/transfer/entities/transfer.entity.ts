import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { TransactionEntity } from "src/transaction/entities/transaction.entity";

type TransferAttributes = {
	id: string,
	amount: number,
	fromPocketId: string,
	toPocketId: string,
	userId: string,
	createdAt: Date,
	updatedAt: Date
}
type TransferCreationAttributes = Optional<TransferAttributes, 'createdAt' | 'updatedAt' | 'id'>;

@Table({
	tableName: 'transfer'
})
export class TransferEntity extends Model<TransferAttributes, TransferCreationAttributes> {
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

	@BelongsTo(() => PocketEntity, { as: "fromPockets", foreignKey: "from_pocket_id", onDelete: "cascade" })
	fromPockets: PocketEntity
	@ForeignKey(() => PocketEntity)
	@Column({
		type: DataType.UUID,
		field: "from_pocket_id",
		allowNull: false,
		unique: false
	})
	declare fromPocketId: string;

	@BelongsTo(() => PocketEntity, { as: "toPockets", foreignKey: "to_pocket_id", onDelete: "cascade" })
	toPockets: PocketEntity
	@ForeignKey(() => PocketEntity)
	@Column({
		type: DataType.UUID,
		field: "to_pocket_id",
		allowNull: false,
		unique: false
	})
	declare toPocketId: string;

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

	@HasMany(() => TransactionEntity, { onDelete: "casCade" })
	transactions: TransactionEntity[]
}
