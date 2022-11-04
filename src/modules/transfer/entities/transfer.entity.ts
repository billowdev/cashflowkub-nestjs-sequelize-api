import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { PocketEntity } from "src/modules/pocket/entities/pocket.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

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
	@ApiProperty({
		description: 'Primary key as transfer id',
		example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a',
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
		description: 'Amount of transfer transaction',
		example: 100.00
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@BelongsTo(() => PocketEntity, { as: "fromPockets", foreignKey: "from_pocket_id", onDelete: "cascade" })
	fromPockets: PocketEntity
	@ForeignKey(() => PocketEntity)
	@ApiProperty({
		description: 'Foreign key as from_pocket_id',
		example: '8407abe9-cbdf-4745-b634-681f42693ee9',
	})
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
	@ApiProperty({
		description: 'Foreign key as to_pocket_id',
		example: '416c355b-e095-4007-9713-218e050dbae7',
	})
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

	@HasMany(() => TransactionEntity, { onDelete: "casCade" })
	transactions: TransactionEntity[]
}
