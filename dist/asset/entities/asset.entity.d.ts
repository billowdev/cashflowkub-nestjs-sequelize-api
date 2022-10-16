import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { UserEntity } from "src/user/entities/user.entity";
export declare enum AssetEnum {
    LIQUID = "liquid",
    PRIVATE = "private",
    INVESTMENT = "investment",
    INTANGIBLE = "intangible"
}
declare type AssetAttributes = {
    id: string;
    value: number;
    desc: string;
    cashflowPerYear: number;
    type: AssetEnum;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type AssetCreationAttributes = Optional<AssetAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class AssetEntity extends Model<AssetAttributes, AssetCreationAttributes> {
    id: string;
    desc: string;
    value: number;
    cashflowPerYear: number;
    type: AssetEnum;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    userId: string;
}
export {};
