import { AuthService } from './auth.service';
import { AuthDto, requestAuthUserDto } from './dto';
import { FastifyReply } from 'fastify';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin(dto: AuthDto, res: FastifyReply): Promise<void>;
    signup(dto: AuthDto, res: FastifyReply): Promise<void>;
    session(req: requestAuthUserDto, res: FastifyReply): void;
}
