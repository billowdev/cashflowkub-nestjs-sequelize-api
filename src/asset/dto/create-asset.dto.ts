import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssetEnum } from '../entities/asset.entity';

export class CreateAssetDto {

	// userId it's provide for controller after get userId from the request
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	userId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	desc: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	value: number;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	cashflowPerYear: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	type: AssetEnum;
}
