import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { UserEntity } from "src/user/entities/user.entity";

export enum CategoryEnum {
	INCOME = 'income',
	EXPENSE = 'expense',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

type CategoryAttributes = {
	id: string,
	name: string,
	desc: string,
	type: CategoryEnum,
	isCustom: boolean,
	userId: string,
	createdAt: Date,
	updatedAt: Date
}
type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'desc' | 'createdAt' | 'updatedAt'>;


@Table({
	tableName: 'category'
})
export class CategoryEntity extends Model<CategoryAttributes, CategoryCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as category id',
		example: 'd810173c-f848-4e87-b9f0-d9f172856555',
		uniqueItems: true,
		nullable: false
	})
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	})
	declare id: string;

	@ApiProperty({
		description: 'Name of category',
		example: 'food',
		maxLength: 100
	})
	@Column({
		type: DataType.STRING(100),
	})
	declare name: string;

	@ApiProperty({
		description: 'The description for category',
		example: 'Food is expense category',
		maxLength: 200,
		nullable: true
	})
	@Column({
		type: DataType.STRING(200),
		allowNull: true

	})
	declare desc: string;

	@ApiProperty({
		description: 'Type of category',
		default: CategoryEnum.EXPENSE,
		enum: CategoryEnum
	})
	@Column({
		type: DataType.ENUM({
			values: [
				CategoryEnum.INCOME,
				CategoryEnum.EXPENSE,
				CategoryEnum.INVESTMENT,
				CategoryEnum.SAVING
			]
		}),
		defaultValue: CategoryEnum.EXPENSE,
		allowNull: false
	})
	declare type: CategoryEnum;

	@ApiProperty({
		description: 'is_custom: true is category of user create and false for admin create',
		default: true,
	})
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true,
		field: "is_custom"
	})
	declare isCustom: boolean;

	@BelongsTo(() => UserEntity, { onDelete: 'NO ACTION' })
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
		description: 'When category was created',
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

	@HasMany(() => CashflowinEntity)
	cashflowins: CashflowinEntity[]

	@HasMany(() => CashflowoutEntity)
	cashflowouts: CashflowoutEntity[]

}
