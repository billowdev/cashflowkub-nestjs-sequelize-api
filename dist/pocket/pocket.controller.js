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
exports.PocketController = void 0;
const common_1 = require("@nestjs/common");
const pocket_service_1 = require("./pocket.service");
const create_pocket_dto_1 = require("./dto/create-pocket.dto");
const update_pocket_dto_1 = require("./dto/update-pocket.dto");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
let PocketController = class PocketController {
    constructor(pocketService) {
        this.pocketService = pocketService;
    }
    async create(createPocketDto, res) {
        const data = await this.pocketService.create(createPocketDto);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "create pocket successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "create pocket failed",
                data: {}
            });
        }
    }
    async findAll(req, res) {
        const userId = req.user.sub;
        const data = await this.pocketService.findAll(userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get all pocket successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get all pocket failed",
                data: {}
            });
        }
    }
    async findOne(id, req, res) {
        const userId = req.user.sub;
        const data = await this.pocketService.findOne(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get pocket by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get pocket by id failed",
                data: {}
            });
        }
    }
    async update(id, updatePocketDto, req, res) {
        const userId = req.user.sub;
        const data = await this.pocketService.update(id, updatePocketDto, userId);
        if (data[0]) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "update pocket by id successfuly",
                data: {}
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "update pocket by id failed",
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const userId = req.user.sub;
        const data = await this.pocketService.remove(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "delete pocket by id successfuly",
                data: {}
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "delete pocket by id failed",
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
    __metadata("design:paramtypes", [create_pocket_dto_1.CreatePocketDto, Object]),
    __metadata("design:returntype", Promise)
], PocketController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PocketController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PocketController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pocket_dto_1.UpdatePocketDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PocketController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PocketController.prototype, "remove", null);
PocketController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('pockets'),
    (0, common_1.Controller)('pockets'),
    __metadata("design:paramtypes", [pocket_service_1.PocketService])
], PocketController);
exports.PocketController = PocketController;
//# sourceMappingURL=pocket.controller.js.map