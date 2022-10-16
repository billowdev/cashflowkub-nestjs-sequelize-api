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
exports.TransactionEntity = exports.TransactionEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const cashflowin_entity_1 = require("../../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../../cashflowout/entities/cashflowout.entity");
const transfer_entity_1 = require("../../transfer/entities/transfer.entity");
const user_entity_1 = require("../../user/entities/user.entity");
var TransactionEnum;
(function (TransactionEnum) {
    TransactionEnum["TRANSFER"] = "transfer";
    TransactionEnum["CASHFLOWIN"] = "cashflowin";
    TransactionEnum["CASHFLOWOUT"] = "cashflowout";
})(TransactionEnum = exports.TransactionEnum || (exports.TransactionEnum = {}));
let TransactionEntity = class TransactionEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: [
                TransactionEnum.CASHFLOWIN,
                TransactionEnum.CASHFLOWOUT,
                TransactionEnum.TRANSFER
            ]
        }),
        allowNull: false
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cashflowin_entity_1.CashflowinEntity, { onDelete: 'casCade' }),
    __metadata("design:type", cashflowin_entity_1.CashflowinEntity)
], TransactionEntity.prototype, "cashflowin", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cashflowin_entity_1.CashflowinEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "cashflowin_id",
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cashflowinId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cashflowout_entity_1.CashflowoutEntity, { onDelete: 'casCade' }),
    __metadata("design:type", cashflowout_entity_1.CashflowoutEntity)
], TransactionEntity.prototype, "cashflowout", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cashflowout_entity_1.CashflowoutEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "cashflowout_id",
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "cashflowoutId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => transfer_entity_1.TransferEntity, { onDelete: 'casCade' }),
    __metadata("design:type", transfer_entity_1.TransferEntity)
], TransactionEntity.prototype, "transfer", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => transfer_entity_1.TransferEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "transfer_id",
        allowNull: true,
        unique: true,
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "transferId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, { onDelete: 'casCade' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TransactionEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "user_id",
        allowNull: false,
        unique: false,
    }),
    __metadata("design:type", String)
], TransactionEntity.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], TransactionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], TransactionEntity.prototype, "updatedAt", void 0);
TransactionEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'transaction'
    })
], TransactionEntity);
exports.TransactionEntity = TransactionEntity;
//# sourceMappingURL=transaction.entity.js.map