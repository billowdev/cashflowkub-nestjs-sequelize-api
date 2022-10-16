'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const category_entity_1 = require("../../category/entities/category.entity");
module.exports = {
    up: async (queryInterface) => {
        const categoryData = [
            {
                id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb1",
                name: "ค่าอาหาร",
                desc: "ค่าอาหาร การกิน",
                type: category_entity_1.CategoryEnum.EXPENSE,
                is_custom: false,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb2",
                name: "รายรับ",
                desc: "รายรับหลัก",
                type: category_entity_1.CategoryEnum.INCOME,
                is_custom: false,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "3aa4a655-940e-46b1-9d4f-4ba90f22bfb3",
                name: "เติมเกมส์",
                desc: "รายจ่ายไม่จำเป็น",
                type: category_entity_1.CategoryEnum.EXPENSE,
                is_custom: true,
                user_id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('category', categoryData, {});
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('category', null, {});
    }
};
//# sourceMappingURL=s2-category-seeder.js.map