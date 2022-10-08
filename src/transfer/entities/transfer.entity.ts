import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PocketAttributes } from "src/pocket/entities/pocket.entity";
import { UserAttributes } from "src/user/entities/user.entity";

@Table({
	tableName: 'transfer'
})
export class TransferAttributes extends Model<TransferAttributes> {
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
	})
	amount: string;

	// @BelongsTo(() => PocketAttributes, { as: "fromPocketId" })
	// @ForeignKey(() => PocketAttributes)
	@Column({
		type: DataType.UUID,
		field: "from_pocket_id",
		allowNull: false,
		unique: false
	})
	fromPocketId: string;
	
	// @BelongsTo(() => PocketAttributes, { as: "toPocketId" })
	// @ForeignKey(() => PocketAttributes)
	@Column({
		type: DataType.UUID,
		field: "to_pocket_id",
		allowNull: false,
		unique: false
	})
	toPocketId: string;


	@BelongsTo(() => UserAttributes, { onDelete: 'casCade' })
	user: UserAttributes
	@ForeignKey(() => UserAttributes)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;
}
