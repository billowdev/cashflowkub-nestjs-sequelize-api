import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { POCKET_REPOSITORY } from 'src/common/core/constants';
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

  async findAll(userId: string): Promise<PocketEntity[]> {
    try {
      return await this.pocketRepo.findAll<PocketEntity>({
        where: { userId },
        raw: true
      })
    } catch (error) {
      throw new BadRequestException('get all pocket failed')
    }
  }

  async findOne(id: string, userId: string): Promise<PocketEntity> {
    try {
      return await this.pocketRepo.findOne<PocketEntity>({
        where: { id, userId },
        raw: true
      })
    } catch (error) {
      throw new BadRequestException('get pocket failed')
    }
  }

  async update(id: string, updatePocketDto: UpdatePocketDto, userId: string): Promise<[number, PocketEntity[]]> {
    try {
      return await this.pocketRepo.update<PocketEntity>({ ...updatePocketDto }, { where: { id, userId } })
    } catch (error) {
      throw new BadRequestException('update pocket failed')
    }
  }

  async remove(id: string, userId: string): Promise<number> {
    try {
      return await this.pocketRepo.destroy<PocketEntity>({
        where: { id, userId }
      })
    } catch (error) {
      throw new BadRequestException('delete pocket failed')
    }
  }
}
