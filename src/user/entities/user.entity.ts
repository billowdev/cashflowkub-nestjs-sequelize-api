import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { Column, DataType, Table, HasOne, Model, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";

@Table({
	tableName: 'users'
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
	  field: 'first_name',
	  type: DataType.STRING(150),
	})
	firstName: string;
  
	@ApiProperty()
	@Column({
	  field: 'last_name',
	  type: DataType.STRING(150),
	})
	lastName: string;
  
	@ApiProperty()
	@Column({
	  type: DataType.STRING(200),
	})
	email: string;
  
	@Column({
	  field: 'is_active',
	  defaultValue: true,
	})
	isActive: boolean;

}
