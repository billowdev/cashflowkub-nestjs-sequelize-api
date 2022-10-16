import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetEntity } from './entities/asset.entity';
export declare class AssetService {
    private readonly assetRepo;
    constructor(assetRepo: typeof AssetEntity);
    create(createAssetDto: CreateAssetDto): Promise<AssetEntity>;
    findAll(userId: string): Promise<AssetEntity[]>;
    findOne(id: string, userId: any): Promise<AssetEntity>;
    update(id: string, userId: string, updateAssetDto: UpdateAssetDto): Promise<[number, AssetEntity[]]>;
    remove(id: string, userId: string): Promise<number>;
}
