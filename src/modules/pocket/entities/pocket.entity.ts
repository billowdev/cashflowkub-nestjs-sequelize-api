import { ApiProperty } from "@nestjs/swagger";
import { Optional, UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CashflowinEntity } from "src/modules/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/modules/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/modules/transfer/entities/transfer.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

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
	@ApiProperty({
		description: 'Primary key as pocket id',
		example: '8407abe9-cbdf-4745-b634-681f42693ee9',
		uniqueItems: true,
		nullable: false
	})
	@Column({
		type: DataType.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	})
	declare id: string

	@ApiProperty({
		description: 'name of pocket',
		example: 'my wallet 1',
		nullable: true
	})
	@Column({
		type: DataType.STRING(100),
	})
	declare name: string;

	@ApiProperty({
		description: 'The balance of pocket',
		default: 0,
		nullable: false
	})
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare balance: number;

	@ApiProperty({
		description: 'When pocket was created',
		nullable: false,
		format: Date(),
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty({
		description: 'When debt was updated',
		nullable: false,
		format: Date(),
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "updated_at",
		defaultValue: new Date()
	})
	declare updatedAt: Date;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@ApiProperty({
		description: 'Foreign key as user id',
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a',
	})
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
