import { ApiResponseOptions } from "@nestjs/swagger";

export const ApiCommonForbiddenResponse: ApiResponseOptions = {
	description: 'Forbidden resource',
	schema: {
		example: {
			statusCode: 403,
			message: 'Forbidden resource',
			error: "Forbidden"
		}
	}
}