import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger"
import { TransferEntity } from "./entities/transfer.entity"

export const ApiTransferCreatedBody: ApiBodyOptions = {
	description: 'The body of transfer for create',
	schema: {
		example: {
			userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
			amount: 100,
			fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
			toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
		}
	}
}
export const ApiTransferCreatedOkResponse: ApiResponseOptions = {
	description: 'create transfer was successfuly',
	type: TransferEntity
}
export const ApiTransferCreatedBadRequestResponse: ApiResponseOptions = {
	description: 'create transfer was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "create transfer was failed",
			error: "Bad Request"
		}
	}
}


export const ApiTransferGetAllOkResponse: ApiResponseOptions = {
	description: 'get all transfer was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "get all transfer was successfuly",
			data:
				[{
					createdAt: "2022-10-23T08:47:11.494Z",
					updatedAt: "2022-10-23T08:47:11.494Z",
					id: "e03cf523-e63c-47c8-8ab4-42806eb2745a",
					userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
					amount: "100.00",
					fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
					toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
				}]
		}
	}
}
export const ApiTransferGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all transfer was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get all transfer was failed",
			error: "Bad Request"
		}
	}
}



export const ApiTransferGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your transfer id that you want to request data',
	example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a'
}
export const ApiTransferGetOneOkResponse: ApiResponseOptions = {
	description: 'get transfer was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "get transfer was successfuly",
			data:
			{
				createdAt: "2022-10-23T08:47:11.494Z",
				updatedAt: "2022-10-23T08:47:11.494Z",
				id: "e03cf523-e63c-47c8-8ab4-42806eb2745a",
				userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
				amount: "100.00",
				fromPocketId: "8407abe9-cbdf-4745-b634-681f42693ee9",
				toPocketId: "416c355b-e095-4007-9713-218e050dbae7"
			}

		}
	}
}
export const ApiTransferGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get transfer was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get transfer was failed",
			error: "Bad Request"
		}
	}
}

export const ApiTransferDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your transfer id that you want to delete data',
	example: 'e03cf523-e63c-47c8-8ab4-42806eb2745a'
}
export const ApiTransferDeleteOkResponse: ApiResponseOptions = {
	description: 'delete transfer was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete transfer was successfuly",
			data: 1
		}
	}
}
export const ApiTransferDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete transfer was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete transfer was failed",
			error: "Bad Request"
		}
	}
}
