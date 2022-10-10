import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import { AssetAttributes } from "src/asset/entities/asset.entity";
import { CashflowinAttributes } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutAttributes } from "src/cashflowout/entities/cashflowout.entity";
import { DebtAttributes } from "src/debt/entities/debt.entity";
import { PocketAttributes } from "src/pocket/entities/pocket.entity";
import { TransferAttributes } from "src/transfer/entities/transfer.entity";
import { Role } from "./role.enum";

@Table({
	tableName: 'user'
})
export class UserAttributes extends Model<UserAttributes> {
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
	username: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
		field: 'hash_password',
	})
	hashPassword: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(150),
		field: 'first_name',
	})
	firstName: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(150),
		field: 'last_name',
	})
	lastName: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(200),
	})
	email: string;

	@Column({
		type: DataType.BOOLEAN,
		field: 'is_active',
		defaultValue: true,
	})
	isActive: boolean;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [Role.USER, Role.ADMIN, Role.PREMIUM]
		}),
		defaultValue: Role.USER
	})
	role: Role;

	@HasMany(() => PocketAttributes)
	pockets: PocketAttributes[]

	@HasMany(() => CashflowinAttributes)
	cashflowins: CashflowinAttributes[]

	@HasMany(() => CashflowoutAttributes)
	cashflowouts: CashflowoutAttributes[]

	@HasMany(() => AssetAttributes)
	assets: AssetAttributes[]

	@HasMany(() => DebtAttributes)
	debts: DebtAttributes[]

	@HasMany(() => TransferAttributes)
	transfers: TransferAttributes[]

	

}
