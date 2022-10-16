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
exports.PocketEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const cashflowin_entity_1 = require("../../cashflowin/entities/cashflowin.entity");
const cashflowout_entity_1 = require("../../cashflowout/entities/cashflowout.entity");
const transfer_entity_1 = require("../../transfer/entities/transfer.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let PocketEntity = class PocketEntity extends sequelize_typescript_1.Model {
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
], PocketEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    __metadata("design:type", String)
], PocketEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
    }),
    __metadata("design:type", Number)
], PocketEntity.prototype, "balance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "created_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], PocketEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: "updated_at",
        defaultValue: new Date()
    }),
    __metadata("design:type", Date)
], PocketEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.UserEntity, { onDelete: 'casCade' }),
    __metadata("design:type", user_entity_1.UserEntity)
], PocketEntity.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.UserEntity),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        field: "user_id",
        allowNull: false
    }),
    __metadata("design:type", String)
], PocketEntity.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowin_entity_1.CashflowinEntity),
    __metadata("design:type", Array)
], PocketEntity.prototype, "cashflowins", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cashflowout_entity_1.CashflowoutEntity),
    __metadata("design:type", Array)
], PocketEntity.prototype, "cashflowouts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transfer_entity_1.TransferEntity, {
        as: 'fromPockets',
        foreignKey: "from_pocket_id"
    }),
    __metadata("design:type", Array)
], PocketEntity.prototype, "fromPockets", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => transfer_entity_1.TransferEntity, {
        as: 'toPockets',
        foreignKey: "to_pocket_id"
    }),
    __metadata("design:type", Array)
], PocketEntity.prototype, "toPockets", void 0);
PocketEntity = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'pocket'
    })
], PocketEntity);
exports.PocketEntity = PocketEntity;
//# sourceMappingURL=pocket.entity.js.map