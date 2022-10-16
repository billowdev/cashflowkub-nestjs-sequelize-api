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
exports.AssetService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
let AssetService = class AssetService {
    constructor(assetRepo) {
        this.assetRepo = assetRepo;
    }
    async create(createAssetDto) {
        try {
            return await this.assetRepo.create(createAssetDto);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAll(userId) {
        try {
            return await this.assetRepo.findAll({
                where: { userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all assets failed');
        }
    }
    async findOne(id, userId) {
        try {
            return await this.assetRepo.findOne({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get asset by id failed');
        }
    }
    async update(id, userId, updateAssetDto) {
        try {
            return await this.assetRepo.update(Object.assign({}, updateAssetDto), {
                where: { id, userId },
                returning: true,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async remove(id, userId) {
        try {
            return await this.assetRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('delete asset failed');
        }
    }
};
AssetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ASSET_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AssetService);
exports.AssetService = AssetService;
//# sourceMappingURL=asset.service.js.map