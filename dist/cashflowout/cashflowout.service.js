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
exports.CashflowoutService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
const transaction_entity_1 = require("../transaction/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
let CashflowoutService = class CashflowoutService {
    constructor(cashflowoutRepo, transactionService) {
        this.cashflowoutRepo = cashflowoutRepo;
        this.transactionService = transactionService;
    }
    async create(createCashflowoutDto) {
        try {
            const cashflowoutData = await this.cashflowoutRepo.create(createCashflowoutDto);
            const { id, userId } = cashflowoutData['dataValues'];
            const transactionCreate = {
                type: transaction_entity_1.TransactionEnum.CASHFLOWOUT,
                cashflowinId: null,
                cashflowoutId: id,
                transferId: null,
                userId
            };
            const transactionData = await this.transactionService.create(transactionCreate);
            if (transactionData) {
                return cashflowoutData;
            }
            else {
                throw new common_1.BadRequestException('create cashflowout failed');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('create cashflowout failed');
        }
    }
    async bulkCreate(createCashflowoutDto) {
        try {
            const bulkCashflowout = await this.cashflowoutRepo.bulkCreate(createCashflowoutDto, {
                returning: true
            });
            new Promise((resolve) => resolve(bulkCashflowout.forEach(cashout => {
                const cashflowoutId = cashout['dataValues'].id;
                const userId = cashout['dataValues'].userId;
                const transactionData = {
                    type: transaction_entity_1.TransactionEnum.CASHFLOWOUT,
                    cashflowinId: null,
                    cashflowoutId: cashflowoutId,
                    transferId: null,
                    userId
                };
                new Promise((resolve) => resolve(this.transactionService.create(transactionData)));
            })));
            return bulkCashflowout;
        }
        catch (error) {
            throw new common_1.BadRequestException('create cashflowin failed');
        }
    }
    async findAll(userId) {
        try {
            return await this.cashflowoutRepo.findAll({
                where: { userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all cashflowout failed');
        }
    }
    async findOne(id, userId) {
        try {
            return await this.cashflowoutRepo.findOne({
                where: {
                    id, userId
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get cashflowout failed');
        }
    }
    async update(id, updateCashflowoutDto, userId) {
        try {
            return await this.cashflowoutRepo.update(Object.assign({}, updateCashflowoutDto), {
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('update cashflowout failed');
        }
    }
    async remove(id, userId) {
        try {
            const isTransactionRemove = await this.transactionService.removeByTypeActionId('cashflowout', id, userId);
            if (!isTransactionRemove) {
                throw new common_1.BadRequestException('remove cashflowout transaction failed');
            }
            return await this.cashflowoutRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('delete cashflowout failed');
        }
    }
};
CashflowoutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CASHFLOWOUT_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    __metadata("design:paramtypes", [Object, transaction_service_1.TransactionService])
], CashflowoutService);
exports.CashflowoutService = CashflowoutService;
//# sourceMappingURL=cashflowout.service.js.map