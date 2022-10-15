import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { UserEntity } from "src/user/entities/user.entity";

type PocketAttributes = {
	id: string,
	name: string,
	balance: number,
	userId: string,
	createdAt: Date,
	updatedAt: Date
}
type PocketCreationAttributes = Optional<PocketAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({
	tableName: 'pocket'
})
export class PocketEntity extends Model<PocketCreationAttributes, PocketCreationAttributes> {
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
		type: DataType.STRING(100),
	})
	declare name: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare balance: number;

	@ApiProperty()
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty()
	@Column({
		type: DataType.DATE,
		field: "updated_at",
		defaultValue: new Date()
	})
	declare updatedAt: Date;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
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

	@HasMany(() => TransferEntity, {
		as: 'fromPockets',
		foreignKey: "from_pocket_id"
	})
	fromPockets: TransferEntity[]

	@HasMany(() => TransferEntity, {
		as: 'toPockets',
		foreignKey: "to_pocket_id"
	})
	toPockets: TransferEntity[]
}
