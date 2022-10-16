import { PocketService } from 'src/pocket/pocket.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferEntity } from './entities/transfer.entity';
export declare class TransferService {
    private readonly transferRepo;
    private readonly pocketService;
    private readonly transactionService;
    constructor(transferRepo: typeof TransferEntity, pocketService: PocketService, transactionService: TransactionService);
    create(createTransferDto: CreateTransferDto): Promise<TransferEntity>;
    findAll(userId: string): Promise<TransferEntity[]>;
    findOne(id: string, userId: string): Promise<TransferEntity>;
    remove(id: string, userId: string): Promise<number>;
}
