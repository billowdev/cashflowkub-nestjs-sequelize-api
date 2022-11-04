import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger"
import { CashflowinEntity } from "./entities/cashflowin.entity"


// ----------- cashflowin create ----------- \\

export const ApiCashflowinGetAllOkResponse: ApiResponseOptions = {
	description: 'get all cashflowins successfuly',
	type: CashflowinEntity,
	isArray: true
}

export const ApiCashflowinGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all cashflowins failed', schema: {
		example: {
			statusCode: 400,
			message: "Unauthorized"
		}
	}
}

export const ApiCashflowinGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowin id that you want to request data',
	example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
}

export const ApiCashflowinGetOneOkResponse: ApiResponseOptions = {
	description: 'get cashflowin successfuly',
	type: CashflowinEntity,
	status: 200
}

export const ApiCashflowinGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get cashflowin failed', schema: {
		example: {
			statusCode: 400,
			message: "Unauthorized"
		}
	}
}

export const ApiCashflowinBulkCreateOkResponse: ApiResponseOptions = {
	description: 'create cashflowins successfuly',
	type: CashflowinEntity,
	isArray: true,
	status: 201
}

export const ApiCashflowinBulkCreateBadRequestResponse: ApiResponseOptions = {
	description: 'cashflowin cannot create. please try again',
	schema: {
		example: {
			statusCode: 400,
			message: "create cashflowin failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowinBulkCreateBody: ApiBodyOptions = {
	description: 'Array body of cashflowin for bulk create',
	type: CashflowinEntity,
	isArray: true,
}

export const ApiCashflowinCreateBody: ApiBodyOptions = {
	description: 'create cashflowin body',
	type: CashflowinEntity
}

export const ApiCashflowinCreateOkResponse: ApiResponseOptions = {
	description: 'create cashflowin successfuly',
	type: CashflowinEntity,
	status: 201,
}

export const ApiCashflowinCreateBadRequestResponse: ApiResponseOptions = {
	description: 'cashflowin cannot create. please try again',
	schema: {
		example: {
			statusCode: 400,
			message: "create cashflowin failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowinUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowin id that you want to update data',
	example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
}

export const ApiCashflowinUpdateBody: ApiBodyOptions = {
	description: 'The body of cashflowin for update',
	type: CashflowinEntity
}

export const ApiCashflowinUpdateOkResponse: ApiResponseOptions = {
	description: 'update cashflowin successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update cashflowin successfuly",
		}
	}
}

export const ApiCashflowinUpdateBadRequestResponse: ApiResponseOptions = {
	description: 'update cashflowin failed', schema: {
		example: {
			statusCode: 400,
			message: "update cashflowin failed",
			error: "Bad Request"
		}
	}
}

export const ApiCashflowinDeleteParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your cashflowin id that you want to delete data',
	example: '0184cccf-26fd-47db-a636-d0ebda81fe09'
}

export const ApiCashflowinDeleteOkResponse: ApiResponseOptions = {
	description: 'delete asset successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete cashflowin successfuly",
		}
	}
}

export const ApiCashflowinDeleteBadRequestResponse: ApiResponseOptions = {
	description: 'delete cashflowin failed', schema: {
		example: {
			statusCode: 400,
			message: "delete cashflowin failed",
			error: "Bad Request"
		}
	}
}