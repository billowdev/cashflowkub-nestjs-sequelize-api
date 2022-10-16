import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from '../auth/dto';
import { CashflowinService } from './cashflowin.service';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
export declare class CashflowinController {
    private readonly cashflowinService;
    constructor(cashflowinService: CashflowinService);
    bulkCreate(createCashflowinDto: BulkCreateCashflowinDto, res: FastifyReply): Promise<void>;
    create(createCashflowinDto: CreateCashflowinDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, res: FastifyReply): Promise<void>;
    update(id: string, updateCashflowinDto: UpdateCashflowinDto, res: FastifyReply, { user }: requestAuthUserDto): Promise<void>;
    remove(id: string, res: FastifyReply, { user }: requestAuthUserDto): Promise<void>;
}
