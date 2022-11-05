import { PartialType } from '@nestjs/swagger';
import { CreatePocketDto } from './create-pocket.dto';

export class UpdatePocketDto extends PartialType(CreatePocketDto) {}
