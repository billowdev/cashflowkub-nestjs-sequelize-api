import { FastifyReply } from 'fastify';
import { requestAuthUserDto } from 'src/auth/dto';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
export declare class DebtController {
    private readonly debtService;
    constructor(debtService: DebtService);
    create(createDebtDto: CreateDebtDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    update(id: string, updateDebtDto: UpdateDebtDto, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
