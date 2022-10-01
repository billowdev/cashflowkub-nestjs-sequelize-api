import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ApiTags('User')
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 100,
  })
  username: string;

  @ApiProperty()
  @Column({
    name: 'hash_password',
    type: 'varchar',
    length: 100,
  })
  hashPassword: string;

  @ApiProperty()
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 150,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 150,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 200,
  })
  email: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;
}
