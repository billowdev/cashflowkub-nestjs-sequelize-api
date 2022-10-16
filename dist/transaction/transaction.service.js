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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const cashflowin_service_1 = require("../cashflowin/cashflowin.service");
const cashflowin_entity_1 = require("../cashflowin/entities/cashflowin.entity");
const cashflowout_service_1 = require("../cashflowout/cashflowout.service");
const cashflowout_entity_1 = require("../cashflowout/entities/cashflowout.entity");
const constants_1 = require("../core/constants");
const transfer_entity_1 = require("../transfer/entities/transfer.entity");
const transfer_service_1 = require("../transfer/transfer.service");
const transaction_entity_1 = require("./entities/transaction.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepo, transferService, cashflowinService, cashflowoutService) {
        this.transactionRepo = transactionRepo;
        this.transferService = transferService;
        this.cashflowinService = cashflowinService;
        this.cashflowoutService = cashflowoutService;
    }
    async create(createTransactionDto) {
        const transactionType = createTransactionDto.type;
        const cashflowinId = createTransactionDto.cashflowinId;
        const cashflowoutId = createTransactionDto.cashflowoutId;
        const transferId = createTransactionDto.transferId;
        try {
            if (cashflowinId || cashflowoutId || transferId) {
                if (transactionType === transaction_entity_1.TransactionEnum.CASHFLOWOUT) {
                    return await this.transactionRepo.create(createTransactionDto);
                }
                else if (transactionType === transaction_entity_1.TransactionEnum.CASHFLOWIN) {
                    return await this.transactionRepo.create(createTransactionDto);
                }
                else if (transactionType === transaction_entity_1.TransactionEnum.TRANSFER) {
                    return await this.transactionRepo.create(createTransactionDto);
                }
            }
            else {
                throw new common_1.BadRequestException('create transactions failed');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('create transactions failed');
        }
    }
    async findAll(userId) {
        try {
            return await this.transactionRepo.findAll({
                where: { userId },
                include: [
                    {
                        model: cashflowin_entity_1.CashflowinEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    },
                    {
                        model: cashflowout_entity_1.CashflowoutEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    },
                    {
                        model: transfer_entity_1.TransferEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    }
                ],
                attributes: {
                    exclude: ['transferId', 'cashflowinId', 'cashflowoutId']
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all transaction failed');
        }
    }
    async findOne(id, userId) {
        try {
            return await this.transactionRepo.findOne({
                where: { id, userId },
                include: [
                    {
                        model: cashflowin_entity_1.CashflowinEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    },
                    {
                        model: cashflowout_entity_1.CashflowoutEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    },
                    {
                        model: transfer_entity_1.TransferEntity,
                        attributes: {
                            exclude: ['userId']
                        }
                    }
                ],
                attributes: {
                    exclude: ['transferId', 'cashflowinId', 'cashflowoutId']
                }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get transaction failed');
        }
    }
    async remove(id, userId) {
        try {
            const transactionData = await this.transactionRepo.findByPk(id);
            if (transactionData.type === transaction_entity_1.TransactionEnum.CASHFLOWIN) {
                await this.cashflowinService.remove(transactionData.cashflowinId, userId);
            }
            else if (transactionData.type === transaction_entity_1.TransactionEnum.CASHFLOWOUT) {
                await this.cashflowoutService.remove(transactionData.cashflowoutId, userId);
            }
            else {
                await this.transferService.remove(transactionData.transferId, userId);
            }
            return await this.transactionRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('delete transaction failed');
        }
    }
    async removeByTypeActionId(type, actionId, userId) {
        try {
            if (type === transaction_entity_1.TransactionEnum.CASHFLOWIN) {
                return await this.transactionRepo.destroy({
                    where: {
                        cashflowinId: actionId,
                        type,
                        userId
                    }
                });
            }
            else if (type === transaction_entity_1.TransactionEnum.CASHFLOWOUT) {
                return await this.transactionRepo.destroy({
                    where: {
                        cashflowoutId: actionId,
                        type,
                        userId
                    }
                });
            }
            else {
                return await this.transactionRepo.destroy({
                    where: {
                        transferId: actionId,
                        type,
                        userId
                    }
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('delete transaction failed');
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TRANSACTION_REPOSITORY)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => transfer_service_1.TransferService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => cashflowin_service_1.CashflowinService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => cashflowout_service_1.CashflowoutService))),
    __metadata("design:paramtypes", [Object, transfer_service_1.TransferService,
        cashflowin_service_1.CashflowinService,
        cashflowout_service_1.CashflowoutService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map