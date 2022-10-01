import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('User')
@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty()
	@Column({
		length: 100
	})
	username: string

	@ApiProperty()
	@Column({
		length: 100
	})
	password: string

	@ApiProperty()
	@Column({
		name: 'first_name',
		length: 150
	})
	firstName: string

	@ApiProperty()
	@Column({
		name: 'last_name',
		length: 150
	})
	lastName: string

	@ApiProperty()
	@Column({
		length: 200
	})
	email: string

	@Column({ default: true, name: 'is_active' })
	isActive: boolean;
}
