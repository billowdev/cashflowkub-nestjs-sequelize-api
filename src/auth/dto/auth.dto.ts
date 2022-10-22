import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SessionDataDto } from "./session.dto";
import { FastifyRequest } from 'fastify';


export class AuthDto {
  @ApiProperty({
    description: 'The username of user must be not null',
    example: 'billowdev'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password of user must be not null',
    example: 'yourpassword1234'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The email of user',
    example: 'billowdev@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The first name of user',
    example: 'Billow',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'The last name of user',
    example: 'dev',
    required: false
  })
  @IsString()
  @IsOptional()
  lastName?: string;

}

export interface RequestAuthUserDto extends FastifyRequest {
  user: SessionDataDto
}