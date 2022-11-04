import { ApiProperty } from "@nestjs/swagger";
import { HasMany, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { PocketEntity } from "src/modules/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
import { TransactionEntity } from "src/modules/transaction/entities/transaction.entity";


export enum CashflowoutEnum {
	FIXED = 'fixed',
	VARIABLE = 'variable',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

type CashflowoutAttributes = {
	id: string,
	desc: string,
	amount: number,
	type: CashflowoutEnum,
	userId: string,
	pocketId: string,
	categoryId: string,
	createdAt: Date,
	updatedAt: Date
}
type CashflowoutCreationAttributes = Optional<CashflowoutAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
	tableName: "cashflowout"
})
export class CashflowoutEntity extends Model<CashflowoutAttributes, CashflowoutCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as cashflowout id',
		example: 'e11ee770-79ec-40b5-8726-cfd6aff1e80b',
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
		description: 'The description for cashflowout transaction',
		example: 'buy japanese food',
		maxLength: 150
	})
	@Column({
		type: DataType.STRING(150),
	})
	declare desc: string;

	@ApiProperty({
		description: 'Amount for cashflowout transaction',
		example: 100.00
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@ApiProperty({
		description: 'Type for cashflowout transaction',
		enum: CashflowoutEnum,
		example: CashflowoutEnum.VARIABLE
	})
	@Column({
		type: DataType.ENUM({
			values: [
				CashflowoutEnum.VARIABLE,
				CashflowoutEnum.FIXED,
				CashflowoutEnum.SAVING,
				CashflowoutEnum.INVESTMENT
			]
		}),
		allowNull: false

	})
	declare type: CashflowoutEnum;

	@ApiProperty({
		description: 'When cashflowout was created',
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
		description: 'When cashflowout was updated',
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

	@BelongsTo(() => PocketEntity, { onDelete: 'NO ACTION' })
	pocket: PocketEntity
	@ForeignKey(() => PocketEntity)
	@ApiProperty({
		description: 'Foreign key as pocket id',
		example: '8407abe9-cbdf-4745-b634-681f42693ee9',
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
		example: 'd810173c-f848-4e87-b9f0-d9f172856551',
	})
	@Column({
		type: DataType.UUID,
		field: "category_id",
		unique: false,
		allowNull: false
	})
	declare categoryId: string;

	@HasMany(() => TransactionEntity, { onDelete: "casCade" })
	transactions: TransactionEntity[]
}
