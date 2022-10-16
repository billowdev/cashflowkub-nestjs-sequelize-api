import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { UserEntity } from "src/user/entities/user.entity";
export declare enum TransactionEnum {
    TRANSFER = "transfer",
    CASHFLOWIN = "cashflowin",
    CASHFLOWOUT = "cashflowout"
}
declare type TransactionAttributes = {
    id: string;
    type: TransactionEnum;
    cashflowinId: string;
    cashflowoutId: string;
    transferId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type TransactionCreationAttributes = Optional<TransactionAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class TransactionEntity extends Model<TransactionAttributes, TransactionCreationAttributes> {
    id: string;
    type: TransactionEnum;
    cashflowin: CashflowinEntity;
    cashflowinId: string;
    cashflowout: CashflowoutEntity;
    cashflowoutId: string;
    transfer: TransferEntity;
    transferId: string;
    user: UserEntity;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
