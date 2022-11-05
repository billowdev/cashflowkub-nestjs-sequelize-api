import { ApiProperty } from "@nestjs/swagger";
import { IsImageFile } from "src/common/validations/image.validation";

export class UploadImageDto {
	@IsImageFile({message: 'Only image files are allowed!'})
	@ApiProperty({
		type: "string",
		format: "binary"
	})
	image: string
}