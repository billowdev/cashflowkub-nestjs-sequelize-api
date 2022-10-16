import { sessionDataDto } from "./session.dto";
import { FastifyRequest } from 'fastify';
export declare class AuthDto {
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}
export interface requestAuthUserDto extends FastifyRequest {
    user: sessionDataDto;
}
