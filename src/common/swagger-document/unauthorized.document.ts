import { ApiResponseOptions } from "@nestjs/swagger";

export const UserUnauthorizedException: ApiResponseOptions = {
	description: 'User Unauthorized ',
	schema: {
		example: {
			"statusCode": 401,
			"message": "Unauthorized"
		}
	}
}