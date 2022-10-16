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
exports.PocketService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
let PocketService = class PocketService {
    constructor(pocketRepo) {
        this.pocketRepo = pocketRepo;
    }
    async create(createPocketDto) {
        try {
            return await this.pocketRepo.create(createPocketDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('create pocket failed');
        }
    }
    async findAll(userId) {
        try {
            return await this.pocketRepo.findAll({
                where: { userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all pocket failed');
        }
    }
    async findOne(id, userId) {
        try {
            return await this.pocketRepo.findOne({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get pocket failed');
        }
    }
    async update(id, updatePocketDto, userId) {
        try {
            return await this.pocketRepo.update(Object.assign({}, updatePocketDto), { where: { id, userId } });
        }
        catch (error) {
            throw new common_1.BadRequestException('update pocket failed');
        }
    }
    async remove(id, userId) {
        try {
            return await this.pocketRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('delete pocket failed');
        }
    }
};
PocketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.POCKET_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], PocketService);
exports.PocketService = PocketService;
//# sourceMappingURL=pocket.service.js.map