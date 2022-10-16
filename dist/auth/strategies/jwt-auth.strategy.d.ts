import { Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
declare const JwtAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAuthStrategy extends JwtAuthStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: any): Promise<any>;
}
export {};
