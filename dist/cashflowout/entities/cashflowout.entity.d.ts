import { Model } from "sequelize-typescript";
import { Optional } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { TransactionEntity } from "src/transaction/entities/transaction.entity";
export declare enum CashflowoutEnum {
    FIXED = "fixed",
    VARIABLE = "variable",
    INVESTMENT = "investment",
    SAVING = "saving"
}
declare type CashflowoutAttributes = {
    id: string;
    desc: string;
    amount: number;
    type: CashflowoutEnum;
    userId: string;
    pocketId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type CashflowoutCreationAttributes = Optional<CashflowoutAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class CashflowoutEntity extends Model<CashflowoutAttributes, CashflowoutCreationAttributes> {
    id: string;
    desc: string;
    amount: number;
    type: CashflowoutEnum;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    userId: string;
    pocket: PocketEntity;
    pocketId: string;
    category: CategoryEntity;
    categoryId: string;
    transactions: TransactionEntity[];
}
export {};
