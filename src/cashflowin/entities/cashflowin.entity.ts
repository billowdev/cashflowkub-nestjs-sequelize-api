import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";

export type CashflowinAttributes = {
	id: string,
	desc: string,
	amount: number,
	userId: string,
	pocketId: string,
	categoryId: string,
	createdAt: Date,
	updatedAt: Date
}
export type CashflowinCreationAttributes = Optional<CashflowinAttributes, 'id'>;

@Table({
	tableName: "cashflowin"
})
export class CashflowinEntity extends Model<CashflowinAttributes, CashflowinCreationAttributes> {
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
		type: DataType.STRING(150),
	})
	declare desc: string;

	@ApiProperty()
	@Column({
		type: DataType.DECIMAL(10, 2),
	})
	declare amount: number;

	@BelongsTo(() => UserEntity, { onDelete: 'casCade' })
	user: UserEntity
	@ForeignKey(() => UserEntity)
	@Column({
		type: DataType.UUID,
		field: "user_id",
		allowNull: false
	})
	declare userId: string;

	@BelongsTo(() => PocketEntity, { onDelete: 'NO ACTION' })
	pocket: PocketEntity
	@ForeignKey(() => PocketEntity)
	@Column({
		type: DataType.UUID,
		field: "pocket_id",
		unique: false,
		allowNull: false
	})
	declare pocketId: string;

	@BelongsTo(() => CategoryEntity, { onDelete: 'NO ACTION' })
	category: CategoryEntity
	@ForeignKey(() => CategoryEntity)
	@Column({
		type: DataType.UUID,
		field: "category_id",
		unique: false,
		allowNull: false
	})
	declare categoryId: string;

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

}
