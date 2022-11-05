import { ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";
import { AssetEntity } from "./entities/asset.entity";

// ----------- asset create ----------- \\
export const ApiAssetCreateResponse: ApiResponseOptions = {
	description: 'Create assets successfuly',
	type: AssetEntity
}
export const ApiAssetCreateBadRequestResponse: ApiResponseOptions =
{
	description: 'Asset cannot create. please try again',
	schema: {
		example: {
			statusCode: 400,
			message: "create asset failed",
			error: "Bad Request"
		}
	}
}

// ----------- asset find all ----------- \\
export const ApiAssetGetAllOkResponse: ApiResponseOptions = {
	description: 'get all assets successfuly',
	type: AssetEntity,
	isArray: true
}

export const ApiAssetGetAllBadRequestResponse: ApiResponseOptions =
{
	description: 'get all assets failed', schema: {
		example: {
			statusCode: 400,
			message: "Unauthorized"
		}
	}
}

// ----------- asset find one ----------- \\
export const ApiAssetGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your asset id that you want to request data',
	example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
}

export const ApiAssetGetOneOkResponse: ApiResponseOptions = {
	description: 'get asset successfuly',
	type: AssetEntity
}
export const ApiAssetGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get asset failed', schema: {
		example: {
			statusCode: 400,
			message: "get asset failed",
		}
	}
}

// ----------- asset update ----------- \\
export const ApiAssetUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your asset id that you want to update',
	example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
}

export const ApiAssetUpdateOkResponse: ApiResponseOptions = {
	description: 'update asset successfuly',
	schema: {
		example: {
			"statusCode": 200,
			"message": "update asset successfuly"
		}
	}
}

export const ApiAssetUpdateBadRequestResponse: ApiResponseOptions = {
	description: 'update asset failed', schema: {
		example: {
			statusCode: 400,
			message: "update asset failed",
			error: "Bad Request"
		}
	}
}


export const ApiAssetDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your asset id that you want to delete',
	example: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216'
}

export const ApiAssetDeleteOkResponse: ApiResponseOptions = {
	description: 'delete asset successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete cashflow in by id successfuly",
		}
	}
}
export const ApiAssetDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete asset failed', schema: {
		example: {
			statusCode: 400,
			message: "remove asset failed",
			error: "Bad Request"
		}
	}
}