import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from '../auth/dto';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
export declare class AssetController {
    private readonly assetService;
    constructor(assetService: AssetService);
    create(createAssetDto: CreateAssetDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    update(id: string, updateAssetDto: UpdateAssetDto, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
