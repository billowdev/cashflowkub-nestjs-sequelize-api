import { PartialType } from '@nestjs/swagger';
import { CreateCashflowinDto } from './create-cashflowin.dto';

export class UpdateCashflowinDto extends PartialType(CreateCashflowinDto) {}
