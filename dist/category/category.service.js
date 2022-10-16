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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../core/constants");
const category_entity_1 = require("./entities/category.entity");
const role_enum_1 = require("../user/entities/role.enum");
let CategoryService = class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async create(createCategoryDto, userId, role) {
        try {
            if (role === role_enum_1.Role.ADMIN) {
                const category = new category_entity_1.CategoryEntity();
                category.name = createCategoryDto.name;
                category.desc = createCategoryDto.desc;
                category.type = createCategoryDto.type;
                category.isCustom = false;
                category.userId = userId;
                return await this.categoryRepo.create(category['dataValues']);
            }
            else {
                const category = new category_entity_1.CategoryEntity();
                category.name = createCategoryDto.name;
                category.desc = createCategoryDto.desc;
                category.type = createCategoryDto.type;
                category.isCustom = true;
                category.userId = userId;
                return await this.categoryRepo.create(category['dataValues']);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('create category failed');
        }
    }
    async findAll(userId) {
        try {
            const systemCategories = await this.categoryRepo.findAll({
                attributes: {
                    exclude: ['userId']
                },
                where: { isCustom: false },
                raw: true
            });
            const customCategories = await this.categoryRepo.findAll({
                attributes: {
                    exclude: ['userId']
                },
                where: { userId, isCustom: true },
                raw: true
            });
            return { customCategories, systemCategories };
        }
        catch (error) {
            throw new common_1.BadRequestException('get all category failed');
        }
    }
    async findOne(id, userId, role) {
        try {
            if (role === role_enum_1.Role.ADMIN) {
                return await this.categoryRepo.findOne({
                    where: { id, isCustom: false, userId }
                });
            }
            else {
                return await this.categoryRepo.findOne({
                    where: { id, isCustom: true, userId }
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('get category by id failed');
        }
    }
    async update(id, updateCategoryDto, userId) {
        try {
            return await this.categoryRepo.update(Object.assign({}, updateCategoryDto), {
                where: { id, userId }
            });
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async remove(id, userId, role) {
        try {
            if (role === role_enum_1.Role.ADMIN) {
                return await this.categoryRepo.destroy({
                    where: { id, isCustom: false }
                });
            }
            else {
                return await this.categoryRepo.destroy({
                    where: { id, userId, isCustom: true }
                });
            }
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CATEGORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map