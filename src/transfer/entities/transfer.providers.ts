import { TRANSFER_REPOSITORY } from "src/common/core/constants";
import { TransferEntity } from "./transfer.entity";

export const transferProviders = [
	{
		provide: TRANSFER_REPOSITORY,
		useValue: TransferEntity
	}
]