import { CashflowinService } from 'src/cashflowin/cashflowin.service';
import { CashflowoutService } from 'src/cashflowout/cashflowout.service';
import { TransferService } from 'src/transfer/transfer.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionEntity } from './entities/transaction.entity';
export declare class TransactionService {
    private readonly transactionRepo;
    private readonly transferService;
    private readonly cashflowinService;
    private readonly cashflowoutService;
    constructor(transactionRepo: typeof TransactionEntity, transferService: TransferService, cashflowinService: CashflowinService, cashflowoutService: CashflowoutService);
    create(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
    findAll(userId: string): Promise<TransactionEntity[]>;
    findOne(id: string, userId: string): Promise<TransactionEntity>;
    remove(id: string, userId: string): Promise<number>;
    removeByTypeActionId(type: string, actionId: string, userId: string): Promise<number>;
}
