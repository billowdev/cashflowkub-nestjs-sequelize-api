import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { requestAuthUserDto } from 'src/auth/dto';
import { FastifyReply } from 'fastify';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    create(createTransactionDto: CreateTransactionDto, res: FastifyReply): Promise<void>;
    findAll(req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    findOne(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
    remove(id: string, req: requestAuthUserDto, res: FastifyReply): Promise<void>;
}
