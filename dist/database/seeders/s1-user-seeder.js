'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const argon = require("argon2");
const role_enum_1 = require("../../user/entities/role.enum");
async function hashPassword(password) {
    const hash = await argon.hash(password, { type: argon.argon2id });
    return hash;
}
module.exports = {
    up: async (queryInterface) => {
        const userData = [
            {
                id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
                username: "test1",
                hash_password: await hashPassword("1234"),
                email: "test1@gmail.com",
                first_name: "test1",
                last_name: "test1",
                phone: "0999321232",
                is_active: true,
                role: role_enum_1.Role.USER,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b051",
                username: "test2",
                hash_password: await hashPassword("1234"),
                email: "test2@gmail.com",
                first_name: "test2",
                last_name: "test2",
                phone: "0999321232",
                is_active: true,
                role: role_enum_1.Role.ADMIN,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ];
        return queryInterface.bulkInsert('user', userData);
    },
    down: async (queryInterface) => {
        return queryInterface.bulkDelete('user', null, {});
    }
};
//# sourceMappingURL=s1-user-seeder.js.map