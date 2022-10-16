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
exports.CashflowoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
const cashflowout_service_1 = require("./cashflowout.service");
const create_cashflowout_dto_1 = require("./dto/create-cashflowout.dto");
const update_cashflowout_dto_1 = require("./dto/update-cashflowout.dto");
let CashflowoutController = class CashflowoutController {
    constructor(cashflowoutService) {
        this.cashflowoutService = cashflowoutService;
    }
    async create(createCashflowoutDto, res) {
        const data = await this.cashflowoutService.create(createCashflowoutDto);
        res.status(200).send({
            statusCode: res.statusCode,
            message: "create cashflow out successfuly",
            data
        });
    }
    async bulkCreate(createCashflowinDto, res) {
        const data = await this.cashflowoutService.bulkCreate(createCashflowinDto);
        res.send({
            statusCode: res.statusCode,
            message: "create bulk cashflowout successfuly",
            data
        });
    }
    async findAll(req, res) {
        const data = await this.cashflowoutService.findAll(req.user.sub);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get all cashflow out successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get all cashflow out failed",
                data: {}
            });
        }
    }
    async findOne(id, req, res) {
        const data = await this.cashflowoutService.findOne(id, req.user.sub);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get cashflow out by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get cashflow out by id failed",
                data: {}
            });
        }
    }
    async update(id, updateCashflowoutDto, req, res) {
        const data = await this.cashflowoutService.update(id, updateCashflowoutDto, req.user.sub);
        if (data[0]) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "update cashflow out by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "update cashflow out by id failed",
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const data = await this.cashflowoutService.remove(id, req.user.sub);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "delete cashflow in by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "delete cashflow in by id failed",
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
    __metadata("design:paramtypes", [create_cashflowout_dto_1.CreateCashflowoutDto, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cashflowout_dto_1.UpdateCashflowoutDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowoutController.prototype, "remove", null);
CashflowoutController = __decorate([
    (0, swagger_1.ApiTags)('cashflowouts'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)('cashflowouts'),
    __metadata("design:paramtypes", [cashflowout_service_1.CashflowoutService])
], CashflowoutController);
exports.CashflowoutController = CashflowoutController;
//# sourceMappingURL=cashflowout.controller.js.map