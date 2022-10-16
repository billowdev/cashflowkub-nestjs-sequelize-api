import { Model } from "sequelize-typescript";
import { Optional } from "sequelize";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { UserEntity } from "src/user/entities/user.entity";
export declare enum CategoryEnum {
    INCOME = "income",
    EXPENSE = "expense",
    INVESTMENT = "investment",
    SAVING = "saving"
}
declare type CategoryAttributes = {
    id: string;
    name: string;
    desc: string;
    type: CategoryEnum;
    isCustom: boolean;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'desc' | 'createdAt' | 'updatedAt'>;
export declare class CategoryEntity extends Model<CategoryAttributes, CategoryCreationAttributes> {
    id: string;
    name: string;
    desc: string;
    type: CategoryEnum;
    isCustom: boolean;
    user: UserEntity;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    cashflowins: CashflowinEntity[];
    cashflowouts: CashflowoutEntity[];
}
export {};
