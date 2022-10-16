import { Model } from "sequelize-typescript";
import { Optional } from "sequelize";
import { UserEntity } from "src/user/entities/user.entity";
import { PocketEntity } from "src/pocket/entities/pocket.entity";
import { CategoryEntity } from "src/category/entities/category.entity";
import { TransactionEntity } from "src/transaction/entities/transaction.entity";
export declare type CashflowinAttributes = {
    id: string;
    desc: string;
    amount: number;
    userId: string;
    pocketId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type CashflowinCreationAttributes = Optional<CashflowinAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class CashflowinEntity extends Model<CashflowinAttributes, CashflowinCreationAttributes> {
    id: string;
    desc: string;
    amount: number;
    user: UserEntity;
    userId: string;
    pocket: PocketEntity;
    pocketId: string;
    category: CategoryEntity;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    transactions: TransactionEntity[];
}
