import { POCKET_REPOSITORY } from "src/common/constants";
import { PocketEntity } from "./pocket.entity";

export const pocketProviders = [
	{
		provide: POCKET_REPOSITORY,
		useValue: PocketEntity
	}
]