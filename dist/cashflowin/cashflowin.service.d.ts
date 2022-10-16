import { PocketService } from 'src/pocket/pocket.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { BulkCreateCashflowinDto, CreateCashflowinDto } from './dto/create-cashflowin.dto';
import { UpdateCashflowinDto } from './dto/update-cashflowin.dto';
import { CashflowinEntity } from './entities/cashflowin.entity';
export declare class CashflowinService {
    private readonly cashflowinRepo;
    private readonly transactionService;
    private readonly pocketService;
    constructor(cashflowinRepo: typeof CashflowinEntity, transactionService: TransactionService, pocketService: PocketService);
    create(createCashflowinDto: CreateCashflowinDto): Promise<CashflowinEntity>;
    bulkCreate(createCashflowinDto: BulkCreateCashflowinDto): Promise<CashflowinEntity[]>;
    findAll(userId: string): Promise<CashflowinEntity[]>;
    findOne(id: string): Promise<CashflowinEntity>;
    update(id: string, updateCashflowinDto: UpdateCashflowinDto, userId: string): Promise<[number, CashflowinEntity[]]>;
    remove(id: string, userId: string): Promise<number>;
}
