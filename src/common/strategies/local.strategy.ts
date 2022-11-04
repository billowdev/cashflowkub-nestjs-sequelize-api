import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }
    
    async validate(username: string, password: string): Promise<any>{
        const auth = await this.authService.validateAuth(username, password);
        
        if (!auth) {
         throw new UnauthorizedException('Invalid credentials');
        }
        return auth;
    }
}