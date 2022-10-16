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
exports.CashflowinController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guards_1 = require("../auth/guards");
const cashflowin_service_1 = require("./cashflowin.service");
const create_cashflowin_dto_1 = require("./dto/create-cashflowin.dto");
const update_cashflowin_dto_1 = require("./dto/update-cashflowin.dto");
let CashflowinController = class CashflowinController {
    constructor(cashflowinService) {
        this.cashflowinService = cashflowinService;
    }
    async bulkCreate(createCashflowinDto, res) {
        const data = await this.cashflowinService.bulkCreate(createCashflowinDto);
        res.send({
            statusCode: res.statusCode,
            message: "create bulk cashflow in successfuly",
            data
        });
    }
    async create(createCashflowinDto, res) {
        const data = await this.cashflowinService.create(createCashflowinDto);
        res.send({
            statusCode: res.statusCode,
            message: "create cashflow in successfuly",
            data
        });
    }
    async findAll(req, res) {
        const { sub } = req.user;
        const data = await this.cashflowinService.findAll(sub);
        res.send({
            statusCode: res.statusCode,
            message: "get all cashflow in successfuly",
            data
        });
    }
    async findOne(id, res) {
        const data = await this.cashflowinService.findOne(id);
        res.send({
            statusCode: res.statusCode,
            message: "get cashflow in by id successfuly",
            data
        });
    }
    async update(id, updateCashflowinDto, res, { user }) {
        const data = await this.cashflowinService.update(id, updateCashflowinDto, user.sub);
        if (data[0]) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "update cashflow in by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "update cashflow in by id failed",
                data: {}
            });
        }
    }
    async remove(id, res, { user }) {
        const data = await this.cashflowinService.remove(id, user.sub);
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
    (0, common_1.Post)('bulk'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "bulkCreate", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cashflowin_dto_1.CreateCashflowinDto, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cashflowin_dto_1.UpdateCashflowinDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CashflowinController.prototype, "remove", null);
CashflowinController = __decorate([
    (0, swagger_1.ApiTags)('cashflowins'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)('cashflowins'),
    __metadata("design:paramtypes", [cashflowin_service_1.CashflowinService])
], CashflowinController);
exports.CashflowinController = CashflowinController;
//# sourceMappingURL=cashflowin.controller.js.map