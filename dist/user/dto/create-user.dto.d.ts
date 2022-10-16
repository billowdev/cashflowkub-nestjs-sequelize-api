import { Role } from "../entities/role.enum";
export declare class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly role?: Role;
}
