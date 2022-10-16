import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from 'src/auth/dto';
import { CashflowoutService } from './cashflowout.service';
import { BulkCreateCashflowoutDto, CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
export declare class CashflowoutController {
    private readonly cashflowoutService;
    constructor(cashflowoutService: CashflowoutService);
    create(createCashflowoutDto: CreateCashflowoutDto, res: FastifyReply): Promise<void>;
    bulkCreate(createCashflowinDto: BulkCreateCashflowoutDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    update(id: string, updateCashflowoutDto: UpdateCashflowoutDto, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
