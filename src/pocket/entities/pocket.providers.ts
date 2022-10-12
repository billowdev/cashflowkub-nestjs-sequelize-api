import { POCKET_REPOSITORY } from "src/core/constants";
import { PocketEntity } from "./pocket.entity";

export const pocketProviders = [
	{
		provide: POCKET_REPOSITORY,
		useValue: PocketEntity
	}
]