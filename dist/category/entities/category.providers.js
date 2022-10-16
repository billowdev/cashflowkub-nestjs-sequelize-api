"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryProviders = void 0;
const constants_1 = require("../../core/constants");
const category_entity_1 = require("./category.entity");
exports.categoryProviders = [
    {
        provide: constants_1.CATEGORY_REPOSITORY,
        useValue: category_entity_1.CategoryEntity,
    },
];
//# sourceMappingURL=category.providers.js.map