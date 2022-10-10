import { PartialType } from '@nestjs/swagger';
import { CreateCashflowoutDto } from './create-cashflowout.dto';

export class UpdateCashflowoutDto extends PartialType(CreateCashflowoutDto) {}
