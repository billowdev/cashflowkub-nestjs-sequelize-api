import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import {  UserEntity } from "src/user/entities/user.entity";

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

	@BelongsTo(() => UserEntity, {onDelete: 'casCade'})
	user: UserEntity
	@ForeignKey(()=> UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	userId: string;

	@HasMany(() => CashflowinEntity)
	cashflowins: CashflowinEntity[]

	@HasMany(() => CashflowoutEntity)
	cashflowouts: CashflowoutEntity[]


}
