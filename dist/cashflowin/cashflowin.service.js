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
exports.CashflowinService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
const pocket_service_1 = require("../pocket/pocket.service");
const transaction_entity_1 = require("../transaction/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
let CashflowinService = class CashflowinService {
    constructor(cashflowinRepo, transactionService, pocketService) {
        this.cashflowinRepo = cashflowinRepo;
        this.transactionService = transactionService;
        this.pocketService = pocketService;
    }
    async create(createCashflowinDto) {
        try {
            const cashin = await this.cashflowinRepo.create(createCashflowinDto);
            const pocketId = createCashflowinDto.pocketId;
            const userId = createCashflowinDto.userId;
            const amount = createCashflowinDto.amount;
            const { id, balance } = await this.pocketService.findOne(pocketId, userId);
            const newBalance = Number(balance) + Number(amount);
            const updateBalancePocket = await this.pocketService.update(id, { balance: newBalance }, userId);
            if (!updateBalancePocket[0]) {
                throw new common_1.BadRequestException('create cashflowin failed');
            }
            const cashflowinId = cashin['dataValues'].id;
            const transactionData = {
                type: transaction_entity_1.TransactionEnum.CASHFLOWIN,
                cashflowinId,
                cashflowoutId: null,
                transferId: null,
                userId
            };
            const transactionCreate = await this.transactionService.create(transactionData);
            if (!transactionCreate)
                throw new common_1.BadRequestException('create cashflowin failed');
            return cashin;
        }
        catch (error) {
            throw new common_1.BadRequestException('create cashflowin failed');
        }
    }
    async bulkCreate(createCashflowinDto) {
        try {
            const bulkCashflowin = await this.cashflowinRepo.bulkCreate(createCashflowinDto, {
                returning: true
            });
            new Promise((resolve) => resolve(bulkCashflowin.forEach(cashin => {
                const cashflowinId = cashin['dataValues'].id;
                const userId = cashin['dataValues'].userId;
                const transactionData = {
                    type: transaction_entity_1.TransactionEnum.CASHFLOWIN,
                    cashflowinId,
                    cashflowoutId: null,
                    transferId: null,
                    userId
                };
                new Promise((resolve) => resolve(this.transactionService.create(transactionData)));
            })));
            return bulkCashflowin;
        }
        catch (error) {
            throw new common_1.BadRequestException('create cashflowin failed');
        }
    }
    async findAll(userId) {
        try {
            return await this.cashflowinRepo.findAll({
                where: {
                    userId
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all cashflowin failed');
        }
    }
    async findOne(id) {
        try {
            return await this.cashflowinRepo.findOne({
                where: { id }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get cashflowin by id failed');
        }
    }
    async update(id, updateCashflowinDto, userId) {
        try {
            return await this.cashflowinRepo.update(Object.assign({}, updateCashflowinDto), { where: { id, userId }, returning: true });
        }
        catch (error) {
            throw new common_1.BadRequestException('update cashflowin failed');
        }
    }
    async remove(id, userId) {
        try {
            const cashflowin = await this.cashflowinRepo.findByPk(id);
            const pocketId = cashflowin.pocketId;
            const cashflowinAmout = cashflowin.amount;
            const pocket = await this.pocketService.findOne(pocketId, userId);
            const newBalance = Number(pocket.balance) - Number(cashflowinAmout);
            await this.pocketService.update(pocketId, { balance: newBalance }, userId);
            const isTransactionRemove = await this.transactionService.removeByTypeActionId('cashflowin', id, userId);
            if (!isTransactionRemove) {
                throw new common_1.BadRequestException('remove cashflowin transaction failed');
            }
            return await this.cashflowinRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('remove cashflowin failed');
        }
    }
};
CashflowinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CASHFLOWIN_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    __param(2, (0, common_1.Inject)(pocket_service_1.PocketService)),
    __metadata("design:paramtypes", [Object, transaction_service_1.TransactionService,
        pocket_service_1.PocketService])
], CashflowinService);
exports.CashflowinService = CashflowinService;
//# sourceMappingURL=cashflowin.service.js.map