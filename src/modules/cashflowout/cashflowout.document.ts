import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";
import { CashflowoutEntity, CashflowoutEnum } from "./entities/cashflowout.entity";

export const ApiCashflowoutCreateBody: ApiBodyOptions = {
	schema: {
		example: {
			"desc": "my cashflowin 1",
			"amount": 100,
			"userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
			"pocketId": "8407abe9-cbdf-4745-b634-681f42693ee9",
			"categoryId": "d810173c-f848-4e87-b9f0-d9f172856555",
		}
	}
}

export const ApiCashflowoutCreatedResponse: ApiResponseOptions = {
	description: 'create cashflowout was successfuly',
	type: CashflowoutEntity
}

export const ApiCashflowoutCreatedBadRequestResponse: ApiResponseOptions = {
	description: 'cashflowout cannot create. please try again',
	schema: {
		example: {
			statusCode: 400,
			message: "create cashflowout was failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowoutBulkCreatedResponse: ApiResponseOptions = {
	description: 'create bulk cashflowout was successfuly',
	type: CashflowoutEntity,
	isArray: true
}

export const ApiCashflowoutBulkCreateBody: ApiBodyOptions = {
	description: 'Array body of cashflowout for bulk create',
	schema: {
		example: [
			{
				"desc": "my cashflowin 1",
				"amount": 100,
				"userId": "41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a",
				"pocketId": "8407abe9-cbdf-4745-b634-681f42693ee9",
				"categoryId": "d810173c-f848-4e87-b9f0-d9f172856555",
			}
		]
	}
}

export const ApiCashflowoutBulkCreateBadRequestResponse: ApiResponseOptions = {
	description: 'cashflowout cannot bulk create. please try again',
	schema: {
		example: {
			statusCode: 400,
			message: "bulk create cashflowout was failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowoutGetAllOkResponse: ApiResponseOptions = {
	description: 'get all cashflowout was successfuly',
	type: CashflowoutEntity,
	isArray: true
}

export const ApiCashflowoutGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all cashflowout was failed', schema: {
		example: {
			statusCode: 400,
			message: "Unauthorized"
		}
	}
}

export const ApiCashflowoutGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowout id that you want to request data',
	example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
}

export const ApiCashflowoutGetOneOkResponse: ApiResponseOptions = {
	description: 'get cashflowout was successfuly',
	type: CashflowoutEntity
}

export const ApiCashflowoutGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get cashflowout was failed', schema: {
		example: {
			statusCode: 400,
			message: "Unauthorized"
		}
	}
}

export const ApiCashflowoutUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowout id that you want to update data',
	example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
}

export const ApiCashflowoutUpdateOkResponse: ApiResponseOptions = {
	description: 'update cashflowout was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update cashflowout was successfuly",
		}
	}
}

export const ApiCashflowoutUpdateBadRequestResponse: ApiResponseOptions = {
	description: 'update cashflowout was failed', schema: {
		example: {
			statusCode: 400,
			message: "update cashflowout was failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowwoutUpdateBody: ApiBodyOptions = {
	description: 'The body of cashflowout for update',
	schema: {
		example: {
			desc: "ค่ารถ",
			amount: 100,
			type: CashflowoutEnum.FIXED
		}
	}
}

export const ApiCashflowoutDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowout id that you want to delete data',
	example: 'e11ee770-79ec-40b5-8726-cfd6aff1e81b'
}

export const ApiCashflowoutDeleteOkResponse: ApiResponseOptions = {
	description: 'delete cashflowout was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete cashflowout was successfuly",
		}
	}
}
export const ApiCashflowoutDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete cashflowout was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete cashflowout was failed",
			error: "Bad Request"
		}
	}
}