import { CashflowinEntity } from "../entities/cashflowin.entity";
declare const CreateCashflowinDto_base: import("@nestjs/common").Type<Partial<CashflowinEntity>>;
export declare class CreateCashflowinDto extends CreateCashflowinDto_base {
    desc: string;
    amount: number;
    pocketId: string;
    userId: string;
    categoryId: string;
}
export declare type BulkCreateCashflowinDto = CreateCashflowinDto[];
export {};
