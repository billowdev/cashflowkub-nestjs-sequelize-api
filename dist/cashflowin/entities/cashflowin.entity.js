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
exports.CashflowinEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const user_entity_1 = require("../../user/entities/user.entity");
const pocket_entity_1 = require("../../pocket/entities/pocket.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
let CashflowinEntity = class CashflowinEntity extends sequelize_typescript_1.Model {
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
], CashflowinEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
    }),
    __metadata("design:type", String)
], CashflowinEntity.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
    }),
    __metadata("design:type", Number)
], CashflowinEntity.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, { onDelete: 'casCade' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CashflowinEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "user_id",
        allowNull: false
    }),
    __metadata("design:type", String)
], CashflowinEntity.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => pocket_entity_1.PocketEntity, { onDelete: 'NO ACTION' }),
    __metadata("design:type", pocket_entity_1.PocketEntity)
], CashflowinEntity.prototype, "pocket", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => pocket_entity_1.PocketEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "pocket_id",
        unique: false,
        allowNull: false
    }),
    __metadata("design:type", String)
], CashflowinEntity.prototype, "pocketId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_entity_1.CategoryEntity, { onDelete: 'NO ACTION' }),
    __metadata("design:type", category_entity_1.CategoryEntity)
], CashflowinEntity.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_entity_1.CategoryEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "category_id",
        unique: false,
        allowNull: false
    }),
    __metadata("design:type", String)
], CashflowinEntity.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], CashflowinEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], CashflowinEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transaction_entity_1.TransactionEntity, { onDelete: "casCade" }),
    __metadata("design:type", Array)
], CashflowinEntity.prototype, "transactions", void 0);
CashflowinEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "cashflowin"
    })
], CashflowinEntity);
exports.CashflowinEntity = CashflowinEntity;
//# sourceMappingURL=cashflowin.entity.js.map