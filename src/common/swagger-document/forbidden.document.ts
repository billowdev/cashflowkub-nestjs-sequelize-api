import { ApiResponseOptions } from "@nestjs/swagger";

export const ForbiddenResponse: ApiResponseOptions = {
	description: 'Forbidden resource',
	schema: {
		example: {
			statusCode: 403,
			message: 'Forbidden resource',
			error: "Forbidden"
		}
	}
}