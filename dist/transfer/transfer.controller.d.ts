import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
export declare class TransferController {
    private readonly transferService;
    constructor(transferService: TransferService);
    create(createTransferDto: CreateTransferDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
