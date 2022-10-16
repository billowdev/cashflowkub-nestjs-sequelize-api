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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const swagger_1 = require("@nestjs/swagger");
const create_transaction_dto_1 = require("./dto/create-transaction.dto");
const guards_1 = require("../auth/guards");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async create(createTransactionDto, res) {
        const data = await this.transactionService.create(createTransactionDto);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "create transaction successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "create transaction failed",
                data: {}
            });
        }
    }
    async findAll(req, res) {
        const userId = req.user.sub;
        const data = await this.transactionService.findAll(userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get all transaction successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get all transaction failed",
                data: {}
            });
        }
    }
    async findOne(id, req, res) {
        const userId = req.user.sub;
        const data = await this.transactionService.findOne(id, userId);
        if (data) {
            res.status(200).send({
                statusCode: res.statusCode,
                message: "get transaction by id successfuly",
                data
            });
        }
        else {
            res.status(400).send({
                statusCode: res.statusCode,
                message: "get transaction by id failed",
                data: {}
            });
        }
    }
    async remove(id, req, res) {
        const userId = req.user.sub;
        const data = await this.transactionService.remove(id, userId);
        res.status(200).send({
            statusCode: res.statusCode,
            message: "delete transaction successfuly",
            data
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "remove", null);
TransactionController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('transactions'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map