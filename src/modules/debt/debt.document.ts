import { ApiBodyOptions, ApiParamOptions, ApiResponseOptions } from "@nestjs/swagger";
import { DebtEntity, DebtEnum } from "./entities/debt.entity";

export const ApiDebtCreateBody: ApiBodyOptions = {
	description: 'The body for create debt',
	schema: {
		example: {
			type: DebtEnum.SHORT,
			amount: 1000,
			interest: 2.0,
			minimumPay: 100,
			priority: 1,
			userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
		}
	}
}
export const ApiDebtCreatedOkResponse: ApiResponseOptions = {
	description: 'create debt was successfuly',
	type: DebtEntity,
	status: 201
}
export const ApiDebtCreatedBadRequestResponse: ApiResponseOptions = {
	description: 'create debt was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "create debt was failed",
			error: "Bad Request"
		}
	}
}

export const ApiDebtGetAllOkResponse: ApiResponseOptions = {
	description: "get all debt was successfuly",
	type: DebtEntity,
	isArray: true
}

export const ApiDebtGetAllBadRequestResponse: ApiResponseOptions = {
	description: 'get all debt was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get all debt was failed",
			error: "Bad Request"
		}
	}
}


export const ApiDebtGetOneParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your debt id that you want to request data',
	example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
}
export const ApiDebtGetOneOkResponse: ApiResponseOptions = {
	description: "get debt was successfuly",
	type: DebtEntity
}
export const ApiDebtGetOneBadRequestResponse: ApiResponseOptions = {
	description: 'get debt was failed',
	schema: {
		example: {
			statusCode: 400,
			message: "get debt was failed",
			error: "Bad Request"
		}
	}
}


export const ApiDebtUpdateParam: ApiParamOptions = {
	name: 'id',
	description: 'Enter your debt id that you want to update data',
	example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
}

export const ApiDebtUpdateBody: ApiBodyOptions = {
	description: 'The body of debt for update',
	schema: {
		example: {
			type: DebtEnum.SHORT,
			amount: 1000,
			interest: 2.0,
			minimumPay: 100,
			priority: 2,
			userId: '41b4f7c2-b221-4a6b-a0e3-d7ec80e0119a'
		}
	}
}
export const ApiDebtUpdateOkResponse: ApiResponseOptions = {
	description: 'update debt was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update debt was successfuly",
		}
	}
}
export const ApiDebtUpdateBadRequestResponse: ApiResponseOptions = {
	description: 'update debt was failed', schema: {
		example: {
			statusCode: 400,
			message: "update debt was failed",
			error: "Bad Request"
		}
	}
}

export const ApiDebtDeleteParam : ApiParamOptions = {
    name: 'id',
    description: 'Enter your debt id that you want to delete data',
    example: 'f05c0ecb-3aa2-4335-9987-553fcb4f365e'
  }

export const ApiDebtDeleteOkResponse: ApiResponseOptions = {
    description: 'delete debt was successfuly',
    schema: {
      example: {
        statusCode: 200,
        message: "delete debt was successfuly",
        data: 1
      }
    }
  }

export const ApiDebtDeleteBadRequestResponse: ApiResponseOptions = {
    description: 'delete debt was failed', schema: {
      example: {
        statusCode: 400,
        message: "update debt was failed",
        error: "Bad Request"
      }
    }
  }