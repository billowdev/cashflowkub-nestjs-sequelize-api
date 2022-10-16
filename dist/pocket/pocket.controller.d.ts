import { PocketService } from './pocket.service';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
export declare class PocketController {
    private readonly pocketService;
    constructor(pocketService: PocketService);
    create(createPocketDto: CreatePocketDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    update(id: string, updatePocketDto: UpdatePocketDto, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
