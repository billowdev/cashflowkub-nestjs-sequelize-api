import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { AssetEntity } from "src/asset/entities/asset.entity";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { DebtEntity } from "src/debt/entities/debt.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { Role } from "./role.enum";

@Table({
	tableName: 'user'
})
export class UserEntity extends Model<UserEntity> {

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

	@HasMany(() => PocketEntity)
	pockets: PocketEntity[]

	@HasMany(() => CashflowinEntity)
	cashflowins: CashflowinEntity[]

	@HasMany(() => CashflowoutEntity)
	cashflowouts: CashflowoutEntity[]

	@HasMany(() => AssetEntity)
	assets: AssetEntity[]

	@HasMany(() => DebtEntity)
	debts: DebtEntity[]

	@HasMany(() => TransferEntity)
	transfers: TransferEntity[]



}
