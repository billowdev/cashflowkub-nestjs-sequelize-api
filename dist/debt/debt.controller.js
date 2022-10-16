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
exports.DebtController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
const debt_service_1 = require("./debt.service");
const create_debt_dto_1 = require("./dto/create-debt.dto");
const update_debt_dto_1 = require("./dto/update-debt.dto");
let DebtController = class DebtController {
    constructor(debtService) {
        this.debtService = debtService;
    }
    async create(createDebtDto, res) {
        const data = await this.debtService.create(createDebtDto);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "create debt successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "create debt failed",
                data: {}
            });
        }
    }
    async findAll(req, res) {
        const userId = req.user.sub;
        const data = await this.debtService.findAll(userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get all debt successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get all debt failed",
                data: {}
            });
        }
    }
    async findOne(id, req, res) {
        const userId = req.user.sub;
        const data = await this.debtService.findOne(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get debt by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get debt by id failed",
                data: {}
            });
        }
    }
    async update(id, updateDebtDto, req, res) {
        const userId = req.user.sub;
        const data = await this.debtService.update(id, updateDebtDto, userId);
        if (data[0]) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "update debt by id successfuly",
                data: {}
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "update debt by id failed",
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const userId = req.user.sub;
        const data = await this.debtService.remove(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "delete debt by id successfuly",
                data: {}
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "delete debt by id failed",
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
    __metadata("design:paramtypes", [create_debt_dto_1.CreateDebtDto, Object]),
    __metadata("design:returntype", Promise)
], DebtController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DebtController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DebtController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_debt_dto_1.UpdateDebtDto, Object, Object]),
    __metadata("design:returntype", Promise)
], DebtController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DebtController.prototype, "remove", null);
DebtController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('debts'),
    (0, common_1.Controller)('debts'),
    __metadata("design:paramtypes", [debt_service_1.DebtService])
], DebtController);
exports.DebtController = DebtController;
//# sourceMappingURL=debt.controller.js.map