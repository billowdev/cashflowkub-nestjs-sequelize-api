import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/user/entities/role.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export class AuthDataDto {
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
    description: 'The role of user',
    example: Role.USER,
    enum: Role
  })
  @IsString()
  @IsNotEmpty()
  role: string;

}

export class SignDto {
  @ApiProperty({
    description: 'response status code',
    example: 200
  })
  @IsNumber()
  @IsOptional()
  statusCode?: number;

  @ApiProperty({
    description: 'Response message',
    example: 'loggedin was successfuly'
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Data after signin',
  })
  @IsObject()
  data: AuthDataDto;
}
