import { JwtService } from '@nestjs/jwt';
import { AuthDto, SignDto } from './dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    private generateToken;
    hashPassword(password: any): Promise<string>;
    private comparePassword;
    validateAuth(username: string, pass: string): Promise<any>;
    signin(auth: AuthDto): Promise<SignDto>;
    signup(user: any): Promise<SignDto>;
}
