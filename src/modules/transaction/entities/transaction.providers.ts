import { TRANSACTION_REPOSITORY } from "src/common/constants";
import { TransactionEntity } from "./transaction.entity";

export const transactionProviders = [
	{
		provide: TRANSACTION_REPOSITORY,
		useValue: TransactionEntity
	}
]