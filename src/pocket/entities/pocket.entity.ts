import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CashflowAttributes } from "src/cashflow/entities/cashflow.entity";
import { UserAttributes } from "src/user/entities/user.entity";

@Table({
	tableName: 'pocket'
})
export class PocketAttributes extends Model<PocketAttributes> {
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
		type: DataType.STRING(100),
	})
	name: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
		allowNull: true

	})
	balance: number;

	@BelongsTo(() => UserAttributes, {onDelete: 'casCade'})
	user: UserAttributes
	@ForeignKey(()=> UserAttributes)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;

	@HasMany(() => CashflowAttributes)
	cashflows: CashflowAttributes[]


}
