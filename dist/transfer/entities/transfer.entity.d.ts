import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { TransactionEntity } from "src/transaction/entities/transaction.entity";
import { UserEntity } from "src/user/entities/user.entity";
declare type TransferAttributes = {
    id: string;
    amount: number;
    fromPocketId: string;
    toPocketId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type TransferCreationAttributes = Optional<TransferAttributes, 'createdAt' | 'updatedAt' | 'id'>;
export declare class TransferEntity extends Model<TransferAttributes, TransferCreationAttributes> {
    id: string;
    amount: number;
    fromPockets: PocketEntity;
    fromPocketId: string;
    toPockets: PocketEntity;
    toPocketId: string;
    user: UserEntity;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    transactions: TransactionEntity[];
}
export {};
