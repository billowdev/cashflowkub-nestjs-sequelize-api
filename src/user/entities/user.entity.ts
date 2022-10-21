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
import { v4 as uuidv4 } from 'uuid';

import {
	Optional,
	UUIDV4,
} from "sequelize";

export type UserAttributes = {
	id: string,
	username: string,
	hashPassword: string,
	email: string,
	firstName: string,
	lastName: string,
	phone: string,
	isActive: boolean,
	role: Role,
	createdAt: Date,
	updatedAt: Date
}
export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'firstName' | 'lastName' | 'phone' | 'createdAt' | 'updatedAt'>;

@Table({
	tableName: 'user'
})
export class UserEntity extends Model<UserAttributes, UserCreationAttributes> {
	@ApiProperty({
		description: 'Primary key as User ID',
		example: uuidv4(),
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
		description: 'The username of user',
		example: 'billowdev',
		uniqueItems: true,
		nullable: false
	})
	@Column({
		type: DataType.STRING(100),
		unique: true,
	})
	declare username: string;

	@ApiProperty({
		description: 'The hashed password of user',
		nullable: false
	})
	@Column({
		type: DataType.STRING(100),
		field: 'hash_password',
	})
	declare hashPassword: string;

	@ApiProperty({
		description: 'The first name of user',
		example: 'Billow',
		nullable: true
	})
	@Column({
		type: DataType.STRING(150),
		field: 'first_name',

	})
	declare firstName: string;

	@ApiProperty({
		description: 'The last name of user',
		example: 'dev',
		nullable: true,
	})
	@Column({
		type: DataType.STRING(150),
		field: 'last_name',
	})
	declare lastName: string;

	@ApiProperty({
		description: 'The email of user',
		example: 'billowdev@gmail.com',
		nullable: true,
		uniqueItems: true
	})
	@Column({
		type: DataType.STRING(200),
		unique: true
	})
	declare email: string;


	@ApiProperty({
		description: 'Phone number of user',
		example: '0987654321',
		nullable: true
	})
	@Column({
		type: DataType.STRING(10),
	})
	declare phone: string;

	@ApiProperty({
		description: 'The status of user',
		default: true,
		example: true
	})
	@Column({
		type: DataType.BOOLEAN,
		field: 'is_active',
		defaultValue: true,
	})
	declare isActive: boolean;

	@ApiProperty({
		description: 'Role of user',
		nullable: false,
		default: Role.USER
	})
	@Column({
		type: DataType.ENUM({
			values: [Role.USER, Role.ADMIN, Role.PREMIUM]
		}),
		defaultValue: Role.USER
	})
	declare role: Role;

	@ApiProperty({
		description: 'When user was created',
		nullable: false,
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "created_at",
		defaultValue: new Date()
	})
	declare createdAt: Date;

	@ApiProperty({
		description: 'When user was updated',
		nullable: false,
		example: new Date()
	})
	@Column({
		type: DataType.DATE,
		field: "updated_at",
		defaultValue: new Date()
	})
	declare updatedAt: Date;

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

