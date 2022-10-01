import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAttributes } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof UserAttributes
  ) { }
  // repository
  async findOne(id: string): Promise<UserAttributes> {
    try {
      return await this.userRepo.findOne<UserAttributes>({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException()
    }
  }
  async findAll(): Promise<UserAttributes[]> {
    try {
      return this.userRepo.findAll()
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // find user by username
  async findOneByUsername(username: string): Promise<UserAttributes> {
    try {
      return await this.userRepo.findOne<UserAttributes>({
        where: { username },
        attributes: { include: ['id', 'username', 'hash_password', 'role'] }
      });
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // create : create account for login
  public async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      return await this.userRepo.create<any>(createUserDto);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // update : update account
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
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
  async remove(id: string): Promise<number> {
    try {
      return this.userRepo.destroy({ where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
