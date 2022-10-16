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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const constants_1 = require("../core/constants");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async findOne(id, excludePassword) {
        try {
            if (excludePassword) {
                return await this.userRepo.findOne({
                    attributes: { exclude: ['hashPassword'] },
                    where: { id },
                });
            }
            else {
                return await this.userRepo.findOne({
                    where: { id },
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAll() {
        try {
            return this.userRepo.findAll({
                attributes: { exclude: ['hashPassword'] },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findOneByUsername(username, excludePassword) {
        try {
            if (excludePassword) {
                return await this.userRepo.findOne({
                    attributes: { exclude: ['hashPassword'] },
                    where: { username }
                });
            }
            else {
                return await this.userRepo.findOne({
                    where: { username }
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findOneByEmail(email) {
        try {
            return await this.userRepo.findOne({
                where: { email }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async registerUser(createUserDto) {
        try {
            const user = new user_entity_1.UserEntity();
            user.email = createUserDto.email.trim().toLowerCase();
            user.username = createUserDto.username.trim().toLowerCase();
            user.hashPassword = await this.authService.hashPassword(createUserDto.password);
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            return await this.userRepo.create(user['dataValues']);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async create(createUserDto) {
        try {
            const user = new user_entity_1.UserEntity();
            user.email = createUserDto.email.trim().toLowerCase();
            user.username = createUserDto.username.trim().toLowerCase();
            user.hashPassword = await this.authService.hashPassword(createUserDto.password);
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.role = createUserDto.role;
            return await this.userRepo.create(user);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async update(id, updateUserDto) {
        try {
            return this.userRepo.update(Object.assign({}, updateUserDto), {
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async remove(id) {
        try {
            return this.userRepo.destroy({ where: { id } });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [Object, auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map