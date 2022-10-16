import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private readonly userRepo;
    private readonly authService;
    constructor(userRepo: typeof UserEntity, authService: AuthService);
    findOne(id: string, excludePassword?: boolean): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOneByUsername(username: string, excludePassword?: boolean): Promise<UserEntity>;
    findOneByEmail(email: any): Promise<UserEntity>;
    registerUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<[number, UserEntity[]]>;
    remove(id: string): Promise<number>;
}
