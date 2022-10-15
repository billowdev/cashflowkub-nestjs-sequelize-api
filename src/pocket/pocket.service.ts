import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { POCKET_REPOSITORY } from 'src/core/constants';
import { CreatePocketDto } from './dto/create-pocket.dto';
import { UpdatePocketDto } from './dto/update-pocket.dto';
import { PocketEntity } from './entities/pocket.entity';

@Injectable()
export class PocketService {
  constructor(
    @Inject(POCKET_REPOSITORY) private readonly pocketRepo: typeof PocketEntity
  ) { }

  async create(createPocketDto: CreatePocketDto): Promise<PocketEntity> {
    try {
      return await this.pocketRepo.create<PocketEntity>(createPocketDto)
    } catch (error) {
      throw new BadRequestException('create pocket failed')
    }
  }

  async findAll(userId: string) {
    try {
      return await this.pocketRepo.findAll({
        where: { userId }
      })
    } catch (error) {
      throw new BadRequestException('get all pocket failed')
    }
  }

  async findOne(id: string, userId: string) {
    try {
      return await this.pocketRepo.findOne({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('get pocket by id failed')
    }
  }

  async update(id: string, updatePocketDto: UpdatePocketDto, userId: string) {
    try {
      return await this.pocketRepo.update({ ...updatePocketDto }, { where: { id, userId } })
    } catch (error) {
      throw new BadRequestException('update pocket failed')
    }
  }

  async remove(id: string, userId: string) {
    try {
      return await this.pocketRepo.destroy({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete pocket failed')
    }
  }
}
