import { TransactionService } from 'src/transaction/transaction.service';
import { BulkCreateCashflowoutDto, CreateCashflowoutDto } from './dto/create-cashflowout.dto';
import { UpdateCashflowoutDto } from './dto/update-cashflowout.dto';
import { CashflowoutEntity } from './entities/cashflowout.entity';
export declare class CashflowoutService {
    private readonly cashflowoutRepo;
    private readonly transactionService;
    constructor(cashflowoutRepo: typeof CashflowoutEntity, transactionService: TransactionService);
    create(createCashflowoutDto: CreateCashflowoutDto): Promise<CashflowoutEntity>;
    bulkCreate(createCashflowoutDto: BulkCreateCashflowoutDto): Promise<CashflowoutEntity[]>;
    findAll(userId: string): Promise<CashflowoutEntity[]>;
    findOne(id: string, userId: string): Promise<CashflowoutEntity>;
    update(id: string, updateCashflowoutDto: UpdateCashflowoutDto, userId: string): Promise<[number, CashflowoutEntity[]]>;
    remove(id: string, userId: string): Promise<number>;
}
