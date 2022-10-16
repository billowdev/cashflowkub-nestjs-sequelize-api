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
exports.UserEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const asset_entity_1 = require("../../asset/entities/asset.entity");
const cashflowin_entity_1 = require("../../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../../cashflowout/entities/cashflowout.entity");
const category_entity_1 = require("../../category/entities/category.entity");
const debt_entity_1 = require("../../debt/entities/debt.entity");
const pocket_entity_1 = require("../../pocket/entities/pocket.entity");
const transfer_entity_1 = require("../../transfer/entities/transfer.entity");
const role_enum_1 = require("./role.enum");
const sequelize_1 = require("sequelize");
let UserEntity = class UserEntity extends sequelize_typescript_1.Model {
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
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        unique: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        field: 'hash_password',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "hashPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        field: 'first_name',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(150),
        field: 'last_name',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        unique: true
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        field: 'is_active',
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: [role_enum_1.Role.USER, role_enum_1.Role.ADMIN, role_enum_1.Role.PREMIUM]
        }),
        defaultValue: role_enum_1.Role.USER
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => pocket_entity_1.PocketEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "pockets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowin_entity_1.CashflowinEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "cashflowins", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowout_entity_1.CashflowoutEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "cashflowouts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => asset_entity_1.AssetEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "assets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => debt_entity_1.DebtEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "debts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transfer_entity_1.TransferEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "transfers", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => category_entity_1.CategoryEntity),
    __metadata("design:type", Array)
], UserEntity.prototype, "categories", void 0);
UserEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'user'
    })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map