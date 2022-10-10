import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UUIDV4 } from "sequelize/types";
import { UserAttributes } from "src/user/entities/user.entity";

@Table({
	tableName: "cashflowin"
})
export class CashflowinAttributes extends Model<CashflowinAttributes> {
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

	@BelongsTo(() => UserAttributes, {onDelete: 'casCade'})
	user: UserAttributes
	@ForeignKey(()=> UserAttributes)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;

}
