import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";
export declare enum DebtEnum {
    LONG = "long",
    SHORT = "short"
}
declare type DebtAttributes = {
    id: string;
    type: DebtEnum;
    amount: number;
    interest: number;
    minimumPay: number;
    priority: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type DebtCreationAttributes = Optional<DebtAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class DebtEntity extends Model<DebtAttributes, DebtCreationAttributes> {
    id: string;
    amount: number;
    interest: number;
    minimumPay: number;
    priority: number;
    type: DebtEnum;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    userId: string;
}
export {};
