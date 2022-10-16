"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const argon = require("argon2");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async generateToken(auth) {
        const token = await this.jwtService.signAsync(auth);
        return token;
    }
    async hashPassword(password) {
        const hash = await argon.hash(password, { type: argon.argon2id });
        return hash;
    }
    async comparePassword(password, dbPassword) {
        const match = await argon.verify(dbPassword, password);
        return match;
    }
    async validateAuth(username, pass) {
        const user = await this.userService.findOneByUsername(username);
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.hashPassword);
        if (!match) {
            return null;
        }
        const result = user['dataValues'];
        delete result.hashPassword;
        return result;
    }
    async signin(auth) {
        try {
            const user = await this.userService.findOneByUsername(auth.username, true);
            const token = await this.generateToken({ sub: user.id, role: user.role });
            const response = {
                message: "User logged in successfully",
                data: { user: user, token, role: user.role }
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException("User logged in failure");
        }
    }
    async signup(user) {
        try {
            const result = await this.userService.registerUser(user);
            delete result['dataValues'].hashPassword;
            const payload = {
                sub: result['dataValues'].id,
                role: result['dataValues'].role
            };
            const token = await this.generateToken(payload);
            const response = {
                message: "user signup successfully",
                data: { user: result, token, role: result.role }
            };
            return response;
        }
        catch (error) {
            throw new common_1.BadRequestException("User registered failure");
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map