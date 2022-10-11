import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";

@Table({
	tableName: 'transfer'
})
export class TransferEntity extends Model<TransferEntity> {
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
	// fromPockets: PocketAttributes
	// @ForeignKey(() => PocketAttributes)

	@Column({
		type: DataType.UUID,
		field: "from_pocket_id",
		allowNull: false,
		unique: false
	})
	fromPocketId: string;

	// @BelongsTo(() => PocketAttributes, { as: "toPocketId" })
	// toPockets: PocketAttributes
	// @ForeignKey(() => PocketAttributes)

	@Column({
		type: DataType.UUID,
		field: "to_pocket_id",
		allowNull: false,
		unique: false
	})
	toPocketId: string;


	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;
}
