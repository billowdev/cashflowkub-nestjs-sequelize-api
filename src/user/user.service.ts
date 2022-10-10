import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserAttributes } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof UserAttributes
  ) { }
  // repository
  async findOne(id: string, excludePassword?: boolean): Promise<UserDto> {
    try {
      if (excludePassword) {
        return await this.userRepo.findOne<UserAttributes>({
          attributes: { exclude: ['hashPassword'] },
          where: { id },
        });
      } else {
        return await this.userRepo.findOne<UserAttributes>({
          where: { id },
        });
      }

    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      return this.userRepo.findAll()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // find user by username
  async findOneByUsername(username: string, excludePassword?: boolean): Promise<UserDto> {
    try {
      if (excludePassword) {
        return await this.userRepo.findOne<UserAttributes>({
          attributes: { exclude: ['hashPassword'] },
          where: { username }
        });
      } else {
        return await this.userRepo.findOne<UserAttributes>({
          where: { username }
        });
      }

    } catch (error) {
      throw new BadRequestException()
    }
  }

  // create : create account for login
  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.userRepo.create<any>(createUserDto);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // update : update account
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userRepo.update(
        {
          ...updateUserDto
        },
        {
          where: { id }
        }
      )
    } catch (error) {
      throw new BadRequestException()
    }

  }

  // remove: delete the account
  async remove(id: string){
    try {
      return this.userRepo.destroy({ where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
