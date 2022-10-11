import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketAttributes } from "src/pocket/entities/pocket.entity";
import { CategoryAttributes } from "src/category/entities/category.entity";

export enum CashflowoutEnum {
	FIXED = 'fixed',
	VARIABLE = 'variable',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

@Table({
	tableName: "cashflowout"
})
export class CashflowoutAttributes extends Model<CashflowoutAttributes> {
	@ApiProperty()
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	id: string

	@ApiProperty()
	@Column({
		type: DataType.STRING(150),
	})
	desc: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	amount: number;

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
	type: CashflowoutEnum;

	@BelongsTo(() => UserEntity, {onDelete: 'casCade'})
	user: UserEntity
	@ForeignKey(()=> UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;

	@BelongsTo(() => PocketAttributes, {onDelete: 'casCade'})
	pocket: PocketAttributes
	@ForeignKey(()=> PocketAttributes)
	@Column({
		type: DataType.UUID,
		field: "pocket_id",
		allowNull: false
	})
	pocketId: string;

	@BelongsTo(() => CategoryAttributes, {onDelete: 'casCade'})
	category: CategoryAttributes
	@ForeignKey(()=> CategoryAttributes)
	@Column({
		type: DataType.UUID,
		field: "category_id",
		allowNull: false
	})
	categoryId: string;

}
