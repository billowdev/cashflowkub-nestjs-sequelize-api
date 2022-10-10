import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator';
// import { UserAttributes } from 'src/user/entities/user.entity';

export class authDataDto {
  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  user: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

}

export class SignDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  message: string;
 
  @ApiProperty()
  @IsObject()
  data: authDataDto;
}
