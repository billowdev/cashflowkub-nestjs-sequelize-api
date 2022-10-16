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
exports.CategoryEntity = exports.CategoryEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize_1 = require("sequelize");
const cashflowin_entity_1 = require("../../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../../cashflowout/entities/cashflowout.entity");
const user_entity_1 = require("../../user/entities/user.entity");
var CategoryEnum;
(function (CategoryEnum) {
    CategoryEnum["INCOME"] = "income";
    CategoryEnum["EXPENSE"] = "expense";
    CategoryEnum["INVESTMENT"] = "investment";
    CategoryEnum["SAVING"] = "saving";
})(CategoryEnum = exports.CategoryEnum || (exports.CategoryEnum = {}));
let CategoryEntity = class CategoryEntity extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_1.UUIDV4,
        primaryKey: true,
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "desc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: [
                CategoryEnum.INCOME,
                CategoryEnum.EXPENSE,
                CategoryEnum.INVESTMENT,
                CategoryEnum.SAVING
            ]
        }),
        defaultValue: CategoryEnum.EXPENSE,
        allowNull: false
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
        field: "is_custom"
    }),
    __metadata("design:type", Boolean)
], CategoryEntity.prototype, "isCustom", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, { onDelete: 'NO ACTION' }),
    __metadata("design:type", user_entity_1.UserEntity)
], CategoryEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "user_id",
        allowNull: false
    }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], CategoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], CategoryEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowin_entity_1.CashflowinEntity),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "cashflowins", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowout_entity_1.CashflowoutEntity),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "cashflowouts", void 0);
CategoryEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'category'
    })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;
//# sourceMappingURL=category.entity.js.map