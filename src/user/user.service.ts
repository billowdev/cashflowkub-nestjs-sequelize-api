import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { USER_REPOSITORY } from 'src/core/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof UserEntity,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) { }
  // repository
  async findOne(id: string, excludePassword?: boolean): Promise<UserDto> {
    try {
      if (excludePassword) {
        return await this.userRepo.findOne<UserEntity>({
          attributes: { exclude: ['hashPassword'] },
          where: { id },
        });
      } else {
        return await this.userRepo.findOne<UserEntity>({
          where: { id },
        });
      }

    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findAll(): Promise<UserDto[]> {
    try {
      return this.userRepo.findAll({
        attributes: { exclude: ['hashPassword'] },
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // find user by username
  async findOneByUsername(username: string, excludePassword?: boolean): Promise<UserDto> {
    try {
      if (excludePassword) {
        return await this.userRepo.findOne<UserEntity>({
          attributes: { exclude: ['hashPassword'] },
          where: { username }
        });
      } else {
        return await this.userRepo.findOne<UserEntity>({
          where: { username }
        });
      }

    } catch (error) {
      throw new BadRequestException()
    }
  }

  // create : create account for login
  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user = new UserEntity();
      user.email = createUserDto.email.trim().toLowerCase()
      user.username = createUserDto.username.trim().toLowerCase()
      user.hashPassword = await this.authService.hashPassword(createUserDto.password);
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.role = createUserDto.role;
      return await this.userRepo.create<UserEntity>(user);
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
  async remove(id: string) {
    try {
      return this.userRepo.destroy({ where: { id } })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
