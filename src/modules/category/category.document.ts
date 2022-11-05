import { ApiBodyOptions, ApiResponseOptions } from "@nestjs/swagger"
import { CategoryEntity, CategoryEnum } from "./entities/category.entity"

export const ApiCategoryCreateBody: ApiBodyOptions = {
	description: 'The body of category for create',
	schema: {
		example: {
			name: "รายจ่าย",
			desc: "รายจ่าย",
			type: CategoryEnum.EXPENSE
		}
	}
}

export const ApiCategoryCreatedOkResponse: ApiResponseOptions = {
	description: 'create category successfuly',
	schema: {
		example: {
			statusCode: 201,
			message: "create category successfuly",
			data:
			{
				statusCode: 201,
				message: "create category successfuly",
				data: {
					id: "d810173c-f848-4e87-b9f0-d9f172856555",
					name: "เติมเกมส์",
					desc: "รายจ่ายไม่จำเป็น",
					type: "expense",
					isCustom: true,
					userId: "41b4f7c2-b221-4a6b-a0e3-d7ec80e0118a",
					createdAt: "2022-10-16T10:36:07.496Z",
					updatedAt: "2022-10-16T10:36:07.496Z"
				}
			}
		}
	}
}
export const ApiCategoryCretedBadRequestResponse: ApiResponseOptions = {
	description: 'category cannot create',
	schema: {
		example: {
			statusCode: 400,
			message: "create category failed",
			error: "Bad Request"
		}
	}
}
export const ApiCategoryGetAllOkResponse = {
	description: 'get all category was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "get all category was successfuly",
			customCategories: [
				{
					id: "d810173c-f848-4e87-b9f0-d9f172856555",
					name: "รายจ่าย 1",
					desc: "รายจ่าย",
					type: "expense",
					isCustom: true,
					createdAt: "2022-10-16T10:36:07.496Z",
					updatedAt: "2022-10-22T13:00:26.643Z"
				}
			],
			systemCategories: [
				{
					id: "d810173c-f848-4e87-b9f0-d9f172856551",
					name: "ค่าอาหาร",
					desc: "ค่าอาหาร การกิน",
					type: "expense",
					isCustom: false,
					createdAt: "2022-10-16T10:36:07.496Z",
					updatedAt: "2022-10-16T10:36:07.496Z"
				}]
		}
	}
}

export const ApiCategoryGetAllBadRequestResponse = {
	description: 'get all category was failed',
	schema: {
		example: {
			statusCode: 400,
			message: 'get all category was failed',
			error: 'Bad Request'
		}
	}
}

export const ApiCategoryGetOneParam = {
	name: 'id',
	description: 'Enter your category id that you want to request data',
	example: 'd810173c-f848-4e87-b9f0-d9f172856555'
}

export const ApiCategoryGetOneOkResponse = {
	description: 'get category was successfuly',
	type: CategoryEntity
}

export const ApiCategoryGetOneBadRequestResponse = {
	description: 'get category was failed',
	schema: {
		example: {
			statusCode: 400,
			message: 'get category was failed',
			error: 'Bad Request'
		}
	}
}

export const ApiCategoryUpdateParam = {
	name: 'id',
	description: 'Enter your category id that you want to update data',
	example: 'd810173c-f848-4e87-b9f0-d9f172856555'
}

export const ApiCategoryUpdateBody = {
	description: 'The body of category for update',
	schema: {
		example: {
			"name": "รายจ่าย 2",
			"desc": "รายจ่าย",
			"type": "expense"
		}
	}
}
export const ApiCategoryUpdateOkResponse = {
	description: 'update category was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "update category was successfuly",
		}
	}
}
export const ApiCategoryUpdateBadRequestResponse = {
	description: 'update category was failed', schema: {
		example: {
			statusCode: 400,
			message: "update category was failed",
			error: "Bad Request"
		}
	}
}
export const ApiCategoryDeleteParam = {
	name: 'id',
	description: 'Enter your category id that you want to delete data',
	example: 'd810173c-f848-4e87-b9f0-d9f172856555'
}
export const ApiCategoryDeleteOkResponse = {
	description: 'delete category was successfuly',
	schema: {
		example: {
			statusCode: 200,
			message: "delete category was successfuly",
		}
	}
}
export const ApiCategoryDeleteBadRequestResponse = {
	description: 'delete category was failed', schema: {
		example: {
			statusCode: 400,
			message: "delete category was failed",
			error: "Bad Request"
		}
	}
}