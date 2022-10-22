import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Role } from 'src/user/entities/role.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export class authDataDto {
  @ApiProperty({
    description: 'User data',
  })
  @IsObject()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty({
    description: 'The token after generate',
    example: 'JWT TOKEN'
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'The user id from session',
    example: Role.USER
  })
  @IsString()
  @IsNotEmpty()
  role: string;

}

export class SignDto {
  @ApiProperty({
    description: 'Response message'
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data after signin',
  })
  @IsObject()
  data: authDataDto;
}
