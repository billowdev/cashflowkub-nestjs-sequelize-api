import { PartialType } from '@nestjs/swagger';
import { CreateCashflowDto } from './create-cashflow.dto';

export class UpdateCashflowDto extends PartialType(CreateCashflowDto) {}
