import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtEntity } from './entities/debt.entity';
export declare class DebtService {
    private readonly debtRepo;
    constructor(debtRepo: typeof DebtEntity);
    create(createDebtDto: CreateDebtDto): Promise<DebtEntity>;
    findAll(userId: string): Promise<DebtEntity[]>;
    findOne(id: string, userId: string): Promise<DebtEntity>;
    update(id: string, updateDebtDto: UpdateDebtDto, userId: string): Promise<[number, DebtEntity[]]>;
    remove(id: string, userId: string): Promise<number>;
}
