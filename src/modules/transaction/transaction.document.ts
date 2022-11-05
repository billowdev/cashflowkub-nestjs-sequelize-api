import { ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";


export const ApiTransactionGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your transaction id that you want to request data',
	example: 'adada566-9708-4903-b5d3-461ab70f779a'
}
export const ApiTransactionGetOneOkResponse: ApiResponseOptions = {
	description: 'get transaction was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "get transaction was successfuly",
			data:
			{
				"id": "adada566-9708-4903-b5d3-461ab70f779a",
				"type": "cashflowout",
				"userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
				"createdAt": "2022-10-16T10:36:07.551Z",
				"updatedAt": "2022-10-16T10:36:07.551Z",
				"cashflowin": null,
				"cashflowout": {
					"createdAt": "2022-10-16T10:36:07.551Z",
					"updatedAt": "2022-10-16T10:36:07.551Z",
					"id": 'e11ee770-79ec-40b5-8726-cfd6aff1e81b',
					"desc": "expense 1",
					"amount": 120.00,
					"type": "variable",
					"pocketId": '8407abe9-cbdf-4745-b634-681f42693ee9',
					"categoryId": 'd810173c-f848-4e87-b9f0-d9f172856551',
				},
				"transfer": null
			}
		}
	}
}
export const ApiTransactionGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get transaction was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get transaction was failed",
			error: "Bad Request"
		}
	}
}


export const ApiTransactionGetAllOkResponse: ApiResponseOptions = {
	description: 'get all transaction was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "get all transaction was successfuly",
			data: [
				{
					"id": "adada566-9708-4903-b5d3-461ab70f779a",
					"type": "cashflowout",
					"userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
					"createdAt": "2022-10-16T10:36:07.551Z",
					"updatedAt": "2022-10-16T10:36:07.551Z",
					"cashflowin": null,
					"cashflowout": {
						"createdAt": "2022-10-16T10:36:07.551Z",
						"updatedAt": "2022-10-16T10:36:07.551Z",
						"id": 'e11ee770-79ec-40b5-8726-cfd6aff1e81b',
						"desc": "expense 1",
						"amount": 120.00,
						"type": "variable",
						"pocketId": '8407abe9-cbdf-4745-b634-681f42693ee9',
						"categoryId": 'd810173c-f848-4e87-b9f0-d9f172856551',
					},
					"transfer": null
				}
			]

		}
	}
}
export const ApiTransactionGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all transaction was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get all transaction was failed",
			error: "Bad Request"
		}
	}
}


export const ApiTransactionDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your transaction id that you want to delete data',
	example: 'adada566-9708-4903-b5d3-461ab70f779a'
}
export const ApiTransactionDeleteOkResponse: ApiResponseOptions = {
	description: 'delete transaction was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete transaction was successfuly",
			data: 1
		}
	}
}
export const ApiTransactionDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete transaction was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete transaction was failed",
			error: "Bad Request"
		}
	}
}