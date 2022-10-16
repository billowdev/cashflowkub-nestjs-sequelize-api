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
exports.AssetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
const asset_service_1 = require("./asset.service");
const create_asset_dto_1 = require("./dto/create-asset.dto");
const update_asset_dto_1 = require("./dto/update-asset.dto");
let AssetController = class AssetController {
    constructor(assetService) {
        this.assetService = assetService;
    }
    async create(createAssetDto, res) {
        const data = await this.assetService.create(createAssetDto);
        res.status(200).send({
            statusCode: res.statusCode,
            message: "create assets successfuly",
            data
        });
    }
    async findAll(req, res) {
        const data = await this.assetService.findAll(req.user.sub);
        res.status(200).send({
            statusCode: res.statusCode,
            message: "get all assets successfuly",
            data
        });
    }
    async findOne(id, req, res) {
        const data = await this.assetService.findOne(id, req.user.sub);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get asset by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get asset by id failed",
                data: {}
            });
        }
    }
    async update(id, updateAssetDto, req, res) {
        const data = await this.assetService.update(id, req.user.sub, updateAssetDto);
        if (data[0]) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "update asset successfully",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "update asset failed",
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const data = await this.assetService.remove(id, req.user.sub);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "delete asset successfully",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "delete asset failed",
                data: {}
            });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_asset_dto_1.CreateAssetDto, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_asset_dto_1.UpdateAssetDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AssetController.prototype, "remove", null);
AssetController = __decorate([
    (0, swagger_1.ApiTags)('assets'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [asset_service_1.AssetService])
], AssetController);
exports.AssetController = AssetController;
//# sourceMappingURL=asset.controller.js.map