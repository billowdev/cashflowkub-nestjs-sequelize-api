import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CategoryAttributes } from "src/categories/entities/category.entity";
import { PocketAttributes } from "src/pocket/entities/pocket.entity";
import { UserAttributes } from "src/user/entities/user.entity";

export enum CashflowType {
	CASHIN = 'cashin',
	CASHOUT = 'cashout',
}

@Table({
	tableName: "cashflow"
})
export class CashflowAttributes extends Model<CashflowAttributes> {
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
		type: DataType.DECIMAL(10, 2),
		allowNull: true

	})
	amount: number;

	@ApiProperty()
	@Column({
		type: DataType.STRING(200),
	})
	desc: string;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [CashflowType.CASHIN, CashflowType.CASHOUT]
		}),
		allowNull: false

	})
	type: CashflowType;

	@BelongsTo(()=>UserAttributes, {onDelete: 'casCade'})
	user: UserAttributes
	@ForeignKey(()=> UserAttributes)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;

	@BelongsTo(()=>PocketAttributes)
	pocket: PocketAttributes
	@ForeignKey(()=> PocketAttributes)
	@Column({
		type: DataType.UUID,
		field: "pocket_id",
		allowNull: false
	})
	pocketId: string;

	@BelongsTo(()=>CategoryAttributes)
	category: CategoryAttributes
	@ForeignKey(()=> CategoryAttributes)
	@Column({
		type: DataType.UUID,
		field: "category_id",
		allowNull: false
	})
	categoryId: string;



}
