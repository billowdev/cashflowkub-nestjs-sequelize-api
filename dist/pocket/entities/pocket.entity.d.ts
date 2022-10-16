import { Optional } from "sequelize";
import { Model } from "sequelize-typescript";
import { CashflowinEntity } from "src/cashflowin/entities/cashflowin.entity";
import { CashflowoutEntity } from "src/cashflowout/entities/cashflowout.entity";
import { TransferEntity } from "src/transfer/entities/transfer.entity";
import { UserEntity } from "src/user/entities/user.entity";
declare type PocketAttributes = {
    id: string;
    name: string;
    balance: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};
declare type PocketCreationAttributes = Optional<PocketAttributes, 'id' | 'createdAt' | 'updatedAt'>;
export declare class PocketEntity extends Model<PocketCreationAttributes, PocketCreationAttributes> {
    id: string;
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    userId: string;
    cashflowins: CashflowinEntity[];
    cashflowouts: CashflowoutEntity[];
    fromPockets: TransferEntity[];
    toPockets: TransferEntity[];
}
export {};
