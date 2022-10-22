import { ApiProperty } from "@nestjs/swagger";
import { HasMany, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { TransactionEntity } from "src/transaction/entities/transaction.entity";
import { v4 as uuidv4 } from 'uuid';

export type CashflowinAttributes = {
	id: string,
	desc: string,
	amount: number,
	userId: string,
	pocketId: string,
	categoryId: string,
	createdAt: Date,
	updatedAt: Date
}
export type CashflowinCreationAttributes = Optional<CashflowinAttributes, 'id' | 'createdAt' | 'updatedAt'>;


@Table({
	tableName: "cashflowin"
})
export class CashflowinEntity extends Model<CashflowinAttributes, CashflowinCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as Cashflowin ID',
		// example: uuidv4(),
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
		description: 'The description of cashflowin',
		example: "my cashflowin 1",
		nullable: true
	})
	@Column({
		type: DataType.STRING(150),
	})
	declare desc: string;

	@ApiProperty({
		description: 'Amount of cash flows',
		example: 100.00,
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@ApiProperty({
		description: 'Foreign key as userId',
		example: uuidv4(),
	})
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;

	@BelongsTo(() => PocketEntity, { onDelete: 'NO ACTION' })
	pocket: PocketEntity
	@ForeignKey(() => PocketEntity)
	@ApiProperty({
		description: 'Foreign key as pocketId',
		example: uuidv4(),
	})
	@Column({
		type: DataType.UUID,
		field: "pocket_id",
		unique: false,
		allowNull: false
	})
	declare pocketId: string;

	@BelongsTo(() => CategoryEntity, { onDelete: 'NO ACTION' })
	category: CategoryEntity
	@ForeignKey(() => CategoryEntity)
	@ApiProperty({
		description: 'Foreign key as categoryId',
		example: uuidv4(),
	})
	@Column({
		type: DataType.UUID,
		field: "category_id",
		unique: false,
		allowNull: false
	})
	declare categoryId: string;

	@ApiProperty({
		description: 'When cashflowin was created',
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
		description: 'When cashflowin was updated',
		nullable: false,
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


