import { AssetEnum } from '../entities/asset.entity';
export declare class CreateAssetDto {
    userId: string;
    desc: string;
    value: number;
    cashflowPerYear: number;
    type: AssetEnum;
}
