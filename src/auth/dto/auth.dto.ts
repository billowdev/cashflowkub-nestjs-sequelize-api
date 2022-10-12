import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { sessionDataDto } from "./session.dto";
import { FastifyRequest} from 'fastify';


export class AuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export interface requestAuthUserDto extends FastifyRequest {
	user: sessionDataDto
}