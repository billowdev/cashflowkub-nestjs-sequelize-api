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
}
type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'desc'>;

@Table({
	tableName: 'category'
})
export class CategoryEntity extends Model<CategoryAttributes, CategoryCreationAttributes> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	})
	declare id: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
	})
	declare name: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(200),
		allowNull: true

	})
	declare desc: string;

	@ApiProperty()
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

	@ApiProperty()
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true
	})
	declare isCustom: boolean;

	@BelongsTo(() => UserEntity, { onDelete: 'NO ACTION' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;

	@HasMany(() => CashflowinEntity)
	cashflowins: CashflowinEntity[]

	@HasMany(() => CashflowoutEntity)
	cashflowouts: CashflowoutEntity[]

}
