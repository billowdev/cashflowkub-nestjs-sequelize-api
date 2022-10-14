import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, HasMany } from "sequelize-typescript";
import { AssetEntity } from "src/asset/entities/asset.entity";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { DebtEntity } from "src/debt/entities/debt.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { Role } from "./role.enum";

import {
	Optional,
	UUIDV4,
} from "sequelize";

type UserAttributes = {
	id: string,
	username: string,
	hashPassword: string,
	email: string,
	firstName: string,
	lastName: string,
	phone: string,
	isActive: boolean,
	role: Role
}
type UserCreationAttributes = Optional<UserAttributes, 'id' | 'firstName' | 'lastName' | 'phone'>;

@Table({
	tableName: 'user'
})
export class UserEntity extends Model<UserAttributes, UserCreationAttributes> {
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
		unique: true
	})
	declare username: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(100),
		field: 'hash_password',
	})
	declare hashPassword: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(150),
		field: 'first_name',
	})
	declare firstName: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(150),
		field: 'last_name',
	})
	declare lastName: string;

	@ApiProperty()
	@Column({
		type: DataType.STRING(200),
		unique: true
	})
	declare email: string;

	
	@ApiProperty()
	@Column({
		type: DataType.STRING(10),
	})
	declare phone: string;

	@Column({
		type: DataType.BOOLEAN,
		field: 'is_active',
		defaultValue: true,
	})
	declare isActive: boolean;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [Role.USER, Role.ADMIN, Role.PREMIUM]
		}),
		defaultValue: Role.USER
	})
	declare role: Role;

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

	@HasMany(() => CategoryEntity)
	categories: CategoryEntity[]


}
