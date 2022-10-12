import { TRANSFER_REPOSITORY } from "src/core/constants";
import { TransferEntity } from "./transfer.entity";

export const transferProviders = [
	{
		provide: TRANSFER_REPOSITORY,
		useValue: TransferEntity
	}
]