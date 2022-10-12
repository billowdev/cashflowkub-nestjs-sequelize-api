import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";

export enum CategoryEnum {
	INCOME = 'income',
	EXPENSE = 'expense',
	INVESTMENT = 'investment',
	SAVING = 'saving'
}

@Table({
	tableName: 'category'
})
export class CategoryEntity extends Model<CategoryEntity> {
	@ApiProperty()
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
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
		type: DataType.STRING(200),
		allowNull: true

	})
	desc: string;

	@ApiProperty()
	@Column({
		type: DataType.ENUM({
			values: [
				CategoryEnum.INCOME,
				CategoryEnum.EXPENSE,
				CategoryEnum.INVESTMENT,
				CategoryEnum.SAVING
			]
		}),
		defaultValue: CategoryEnum.EXPENSE,
		allowNull: false
	})
	type: CategoryEnum;

	@ApiProperty()
	@Column({
		type: DataType.BOOLEAN,
		defaultValue: true
	})
	isCustom: boolean;

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
