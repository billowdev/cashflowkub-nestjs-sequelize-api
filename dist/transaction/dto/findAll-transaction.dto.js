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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const cashflowin_entity_1 = require("../../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../../cashflowout/entities/cashflowout.entity");
const transfer_entity_1 = require("../../transfer/entities/transfer.entity");
class FindAllTransactionDto extends transfer_entity_1.TransferEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllTransactionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FindAllTransactionDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], FindAllTransactionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], FindAllTransactionDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", cashflowin_entity_1.CashflowinEntity)
], FindAllTransactionDto.prototype, "cashflowin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", cashflowout_entity_1.CashflowoutEntity)
], FindAllTransactionDto.prototype, "cashflowout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", transfer_entity_1.TransferEntity)
], FindAllTransactionDto.prototype, "transfer", void 0);
exports.FindAllTransactionDto = FindAllTransactionDto;
//# sourceMappingURL=findAll-transaction.dto.js.map