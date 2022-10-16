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
exports.TransferController = void 0;
const common_1 = require("@nestjs/common");
const transfer_service_1 = require("./transfer.service");
const create_transfer_dto_1 = require("./dto/create-transfer.dto");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
let TransferController = class TransferController {
    constructor(transferService) {
        this.transferService = transferService;
    }
    async create(createTransferDto, res) {
        const data = await this.transferService.create(createTransferDto);
        res.status(200).send({
            statusCode: res.statusCode,
            message: 'create transfer successfuly',
            data
        });
    }
    async findAll(req, res) {
        const userId = req.user.sub;
        const data = await this.transferService.findAll(userId);
        res.status(200).send({
            statusCode: res.statusCode,
            message: 'get all transfer successfuly',
            data
        });
    }
    async findOne(id, req, res) {
        const userId = req.user.sub;
        const data = await this.transferService.findOne(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: 'get transfer successfuly',
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: 'get transfer failed',
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const userId = req.user.sub;
        const data = await this.transferService.remove(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: 'delete transfer successfuly',
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: 'delete transfer failed',
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
    __metadata("design:paramtypes", [create_transfer_dto_1.CreateTransferDto, Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TransferController.prototype, "remove", null);
TransferController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('transfers'),
    (0, common_1.Controller)('transfers'),
    __metadata("design:paramtypes", [transfer_service_1.TransferService])
], TransferController);
exports.TransferController = TransferController;
//# sourceMappingURL=transfer.controller.js.map