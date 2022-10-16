import { DebtEnum } from "../entities/debt.entity";
export declare class CreateDebtDto {
    type: DebtEnum;
    amount: number;
    interest: number;
    minimumPay: number;
    priority: number;
    userId: string;
}
