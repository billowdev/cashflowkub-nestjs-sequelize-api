import { TRANSACTION_REPOSITORY } from "src/core/constants";
import { TransactionEntity } from "./transaction.entity";

export const transactionProviders = [
	{
		provide: TRANSACTION_REPOSITORY,
		useValue: TransactionEntity
	}
]