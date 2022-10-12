import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
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

	@BelongsTo(() => PocketEntity, { as: "fromPockets", foreignKey: "from_pocket_id" })
	fromPockets: PocketEntity
	@ForeignKey(() => PocketEntity)

	@Column({
		type: DataType.UUID,
		field: "from_pocket_id",
		allowNull: false,
		unique: false
	})
	fromPocketId: string;

	@BelongsTo(() => PocketEntity, { as: "toPockets", foreignKey: "to_pocket_id" })
	toPockets: PocketEntity
	@ForeignKey(() => PocketEntity)

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
