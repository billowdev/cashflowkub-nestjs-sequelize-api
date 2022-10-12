import { Inject, Injectable } from '@nestjs/common';
import { POCKET_REPOSITORY } from 'src/core/constants';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { PocketEntity } from './entities/pocket.entity';

@Injectable()
export class PocketService {
  constructor(
    @Inject(POCKET_REPOSITORY) private readonly pocketRepo: typeof PocketEntity
  ){}

  create(createPocketDto: CreatePocketDto) {
    return 'This action adds a new pocket';
  }

  findAll() {
    return `This action returns all pocket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pocket`;
  }

  update(id: number, updatePocketDto: UpdatePocketDto) {
    return `This action updates a #${id} pocket`;
  }

  remove(id: number) {
    return `This action removes a #${id} pocket`;
  }
}
