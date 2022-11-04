import { POCKET_REPOSITORY } from "src/common/core/constants";
import { PocketEntity } from "./pocket.entity";

export const pocketProviders = [
	{
		provide: POCKET_REPOSITORY,
		useValue: PocketEntity
	}
]