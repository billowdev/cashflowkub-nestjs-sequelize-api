import { ApiParamOptions, ApiResponseOptions, ApiBodyOptions } from "@nestjs/swagger"
import { UserEntity } from "./entities/user.entity"


export const ApiUserCreatedBody: ApiBodyOptions = {
	description: 'The body of user for create',
	schema: {
		example: {
			"email": "email@gmail.com",
			"username": "yourusername",
			"password": "yourpassword1234",
			"firstName": "first name",
			"lastName": "last name",
			"role": "premium"
		}
	}
}
export const ApiUserCreatedOkResponse: ApiResponseOptions = {
	description: 'create user was successfuly',
	schema: {
		example: {
			"createdAt": "2022-10-23T09:30:13.144Z",
			"updatedAt": "2022-10-23T09:30:13.144Z",
			"id": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
			"isActive": true,
			"role": "premium",
			"email": "email@gmail.com",
			"username": "test3",
			"firstName": "test3",
			"lastName": "test3",
			"phone": null
		}
	}
}

export const ApiUserCreatedBadRequestResponse: ApiResponseOptions = {
	description: 'create user was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "create user was failed",
			error: "Bad Request"
		}
	}
}


export const ApiUserCreatedForbiddenResponse: ApiResponseOptions = {
	description: 'If username already exist',
	schema: {
		example: {
			"statusCode": 403,
			"message": "This username already exist",
			"error": "Forbidden"
		}
	}
}



export const ApiUserGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your user id that you want to request data',
	example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
}
export const ApiUserGetOneOkResponse: ApiResponseOptions = {
	description: 'get user was successfuly',
	type: UserEntity
}
export const ApiUserGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get user was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get user was failed",
			error: "Bad Request"
		}
	}
}

export const ApiUserGetAllOkResponse: ApiResponseOptions = {
	description: 'get all user was successfuly',
	type: UserEntity,
	isArray: true
}
export const ApiUserGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all user was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get all user was failed",
			error: "Bad Request"
		}
	}
}
export const ApiUserGetAllForbiddenResponse: ApiResponseOptions = {
	description: 'If user not admin',
	schema: {
		example:
		{
			"statusCode": 403,
			"message": "Forbidden resource",
			"error": "Forbidden"
		}
	}
}


export const ApiUserUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your user id that you want to update data',
	example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
}
export const ApiUserUpdateBody: ApiBodyOptions = {
	description: 'The body of user for update',
	schema: {
		example: {
			"email": "email@gmail.com",
			"username": "yourusername",
			"password": "yourpassword1234",
			"firstName": "first name",
			"lastName": "last name",
			"role": "premium"
		}
	}
}
export const ApiUserUpdateOkResponse: ApiResponseOptions = {
	description: 'update user was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update user was successfuly",
			data: [1]
		}
	}
}
export const ApiUserUpdateBadRequestResponse: ApiResponseOptions = {
	description: 'update user was failed', schema: {
		example: {
			statusCode: 400,
			message: "update user was failed",
			error: "Bad Request"
		}
	}
}

export const ApiUserDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your user id that you want to delete data',
	example: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
}
export const ApiUserDeleteOkResponse: ApiResponseOptions = {
	description: 'delete user was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete user was successfuly",
			data: 1
		}
	}
}
export const ApiUserDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete user was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete user was failed",
			error: "Bad Request"
		}
	}
}
