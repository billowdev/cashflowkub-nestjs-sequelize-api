import { ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";
import { AssetEntity, AssetEnum } from "./entities/asset.entity";

// ----------- asset create ----------- \\
export const ApiAssetCreateResponseDocument: ApiResponseOptions = {
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
			data: {}
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
			statusCode: 200,
			message: "update asset successfuly",
			data: [
				1,
				[{
					id: '44d4a72e-0bde-4697-8ebb-9c2ac1e96216',
					desc: "asset 1",
					value: "1000.00",
					type: AssetEnum.PRIVATE,
					cashflowPerYear: "500.00",
					createdAt: new Date(),
					updatedAt: new Date(),
					userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
				}]
			]
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
			data: 1
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