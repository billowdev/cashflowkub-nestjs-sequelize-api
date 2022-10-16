import { CashflowoutEnum } from "../entities/cashflowout.entity";
export declare class CreateCashflowoutDto {
    desc: string;
    amount: number;
    type: CashflowoutEnum;
    pocketId: string;
    userId: string;
    categoryId: string;
}
export declare type BulkCreateCashflowoutDto = CreateCashflowoutDto[];
