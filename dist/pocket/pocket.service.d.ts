import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { PocketEntity } from './entities/pocket.entity';
export declare class PocketService {
    private readonly pocketRepo;
    constructor(pocketRepo: typeof PocketEntity);
    create(createPocketDto: CreatePocketDto): Promise<PocketEntity>;
    findAll(userId: string): Promise<PocketEntity[]>;
    findOne(id: string, userId: string): Promise<PocketEntity>;
    update(id: string, updatePocketDto: UpdatePocketDto, userId: string): Promise<[number, PocketEntity[]]>;
    remove(id: string, userId: string): Promise<number>;
}
