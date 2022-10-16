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
exports.AssetEntity = exports.AssetEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_entity_1 = require("../../user/entities/user.entity");
var AssetEnum;
(function (AssetEnum) {
    AssetEnum["LIQUID"] = "liquid";
    AssetEnum["PRIVATE"] = "private";
    AssetEnum["INVESTMENT"] = "investment";
    AssetEnum["INTANGIBLE"] = "intangible";
})(AssetEnum = exports.AssetEnum || (exports.AssetEnum = {}));
let AssetEntity = class AssetEntity extends sequelize_typescript_1.Model {
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
], AssetEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], AssetEntity.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
    }),
    __metadata("design:type", Number)
], AssetEntity.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        field: "cashflow_per_year"
    }),
    __metadata("design:type", Number)
], AssetEntity.prototype, "cashflowPerYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: [
                AssetEnum.LIQUID,
                AssetEnum.PRIVATE,
                AssetEnum.INVESTMENT,
                AssetEnum.INTANGIBLE
            ]
        }),
        defaultValue: AssetEnum.LIQUID,
        allowNull: false
    }),
    __metadata("design:type", String)
], AssetEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], AssetEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], AssetEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, { onDelete: 'casCade' }),
    __metadata("design:type", user_entity_1.UserEntity)
], AssetEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "user_id",
        allowNull: false
    }),
    __metadata("design:type", String)
], AssetEntity.prototype, "userId", void 0);
AssetEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'asset'
    })
], AssetEntity);
exports.AssetEntity = AssetEntity;
//# sourceMappingURL=asset.entity.js.map