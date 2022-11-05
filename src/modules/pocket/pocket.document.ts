import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger"
import { PocketEntity } from "./entities/pocket.entity"

export const ApiPocketCreatedBody: ApiBodyOptions = {
	description: 'The body of pocket for create new pocket',
	schema: {
		example: {
			name: "my wallet 1",
			balance: "1500.00",
			userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a"
		}
	}
}

export const ApiPocketCreatedOkResponse: ApiResponseOptions = {
	description: 'create pocket was successfuly',
	type: PocketEntity
}
export const ApiPocketCreatedBadRequestResponse: ApiResponseOptions = {
	description: 'create pocket was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "create pocket was failed",
			error: "Bad Request"
		}
	}
}

export const ApiPocketGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your pocket id that you want to request data',
	example: '8407abe9-cbdf-4745-b634-681f42693ee9'
}

export const ApiPocketGetOneOkResponse: ApiResponseOptions = {
	description: 'get pocket was successfuly',
	type: PocketEntity
}
export const ApiPocketGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get pocket was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get pocket was failed",
			error: "Bad Request"
		}
	}
}

export const ApiPocketGetAllOkResponse: ApiResponseOptions = {
	description: 'get all pocket was successfuly',
	type: PocketEntity,
	isArray: true
}

export const ApiPocketGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all pocket was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get all pocket was failed",
			error: "Bad Request"
		}
	}
}

export const ApiPocketUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your pocket id that you want to request data',
	example: '8407abe9-cbdf-4745-b634-681f42693ee9'
}


export const ApiPocketUpadateBody: ApiBodyOptions = {
	description: 'The body of debt for update',
	schema: {
		example: {
			name: "my wallet 1",
			balance: "1200.00",
			userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
		}
	}
}
export const ApiPocketUpadateOkResponse: ApiResponseOptions = {
	description: 'update pocket was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update pocket was successfuly",
		}
	}
}
export const ApiPocketUpadateBadRequestResponse: ApiResponseOptions = {
	description: 'update pocket was failed', schema: {
		example: {
			statusCode: 400,
			message: "update pocket was failed",
			error: "Bad Request"
		}
	}
}

export const ApiPocketDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your pocket id that you want to delete data',
	example: '8407abe9-cbdf-4745-b634-681f42693ee9'
}
export const ApiPocketDeleteOkResponse: ApiResponseOptions = {
	description: 'delete pocket was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete pocket was successfuly",
			data: 1
		}
	}
}
export const ApiPocketDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete pocket was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete pocket was failed",
			error: "Bad Request"
		}
	}
}
