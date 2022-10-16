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
exports.TransferService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
const pocket_service_1 = require("../pocket/pocket.service");
const transaction_entity_1 = require("../transaction/entities/transaction.entity");
const transaction_service_1 = require("../transaction/transaction.service");
let TransferService = class TransferService {
    constructor(transferRepo, pocketService, transactionService) {
        this.transferRepo = transferRepo;
        this.pocketService = pocketService;
        this.transactionService = transactionService;
    }
    async create(createTransferDto) {
        try {
            const userId = createTransferDto.userId;
            const amountTransfer = createTransferDto.amount;
            const fromPocketId = createTransferDto.fromPocketId;
            const toPocketId = createTransferDto.toPocketId;
            const fromPocket = await this.pocketService.findOne(fromPocketId, userId);
            const toPocket = await this.pocketService.findOne(toPocketId, userId);
            const fromPocketBalance = fromPocket.balance;
            const toPocketBalance = toPocket.balance;
            const balanceFromPocket = Number(fromPocketBalance) - amountTransfer;
            const balanceToPocket = Number(toPocketBalance) + amountTransfer;
            if (balanceFromPocket < 0) {
                throw new common_1.BadRequestException('create transfer failed');
            }
            await this.pocketService.update(fromPocketId, { balance: balanceFromPocket }, userId);
            await this.pocketService.update(toPocketId, { balance: balanceToPocket }, userId);
            const transferData = await this.transferRepo.create(createTransferDto);
            const transactionCreate = {
                type: transaction_entity_1.TransactionEnum.TRANSFER,
                cashflowinId: null,
                cashflowoutId: null,
                transferId: transferData.id,
                userId
            };
            const transactionData = await this.transactionService.create(transactionCreate);
            if (transactionData) {
                return transferData;
            }
            else {
                throw new common_1.BadRequestException('create cashflowout failed');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Create transfer failed');
        }
    }
    async findAll(userId) {
        try {
            return await this.transferRepo.findAll({
                where: { userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get all transfer failed');
        }
    }
    async findOne(id, userId) {
        try {
            return await this.transferRepo.findOne({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('get transfer failed');
        }
    }
    async remove(id, userId) {
        try {
            return await this.transferRepo.destroy({
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('destroy transfer failed');
        }
    }
};
TransferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TRANSFER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(pocket_service_1.PocketService)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_service_1.TransactionService))),
    __metadata("design:paramtypes", [Object, pocket_service_1.PocketService,
        transaction_service_1.TransactionService])
], TransferService);
exports.TransferService = TransferService;
//# sourceMappingURL=transfer.service.js.map