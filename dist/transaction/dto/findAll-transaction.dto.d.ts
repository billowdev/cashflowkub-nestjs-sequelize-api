import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
export declare class FindAllTransactionDto extends TransferEntity {
    id: string;
    type: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    cashflowin: CashflowinEntity;
    cashflowout: CashflowoutEntity;
    transfer: TransferEntity;
}
