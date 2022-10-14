import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";

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
}
type CashflowoutCreationAttributes = Optional<CashflowoutAttributes, 'id'>;

@Table({
	tableName: "cashflowout"
})
export class CashflowoutEntity extends Model<CashflowoutAttributes, CashflowoutCreationAttributes> {
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
		type: DataType.STRING(150),
	})
	declare desc: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@ApiProperty()
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

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;

	@BelongsTo(() => PocketEntity, { onDelete: 'NO ACTION' })
	pocket: PocketEntity
	@ForeignKey(() => PocketEntity)
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
	@Column({
		type: DataType.UUID,
		field: "category_id",
		unique: false,
		allowNull: false
	})
	declare categoryId: string;

}
