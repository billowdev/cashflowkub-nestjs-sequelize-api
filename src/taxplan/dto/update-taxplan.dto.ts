import { PartialType } from '@nestjs/swagger';
import { CreateTaxplanDto } from './create-taxplan.dto';

export class UpdateTaxplanDto extends PartialType(CreateTaxplanDto) {}
