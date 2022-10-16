import { TransactionEnum } from "../entities/transaction.entity";
export declare class CreateTransactionDto {
    type: TransactionEnum;
    cashflowinId: string;
    cashflowoutId: string;
    transferId: string;
    userId: string;
}
