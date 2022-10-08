import { PartialType } from '@nestjs/swagger';
import { CreateBalancesheetDto } from './create-balancesheet.dto';

export class UpdateBalancesheetDto extends PartialType(CreateBalancesheetDto) {}
