import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssetEnum } from '../entities/asset.entity';


export class CreateAssetDto {
	@ApiProperty({
		description: "userId of user who in session",
		example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
	})
	@IsString()
	@IsNotEmpty()
	userId: string;

	@ApiProperty({
		description: "The description of asset",
		example: 'this is description for asset',
		maxLength: 200
	})
	@IsString()
	@IsNotEmpty()
	desc: string;

	@ApiProperty({
		description: "The value of asset",
		example: 100.00
	})
	@IsNumber()
	@IsNotEmpty()
	value: number;

	@ApiProperty({
		description: "cashflowin per year of asset",
		example: 10.00
	})
	@IsNumber()
	@IsNotEmpty()
	cashflowPerYear: number;

	@ApiProperty({
		description: "The type of asset",
		example: AssetEnum.INTANGIBLE,
		enum: AssetEnum
	})
	@IsString()
	@IsNotEmpty()
	type: AssetEnum;
}
