'use strict';

import { QueryInterface } from "sequelize";
import * as argon from 'argon2'
import { Role } from "src/modules/user/entities/role.enum";

async function hashPassword(password) {
  const hash = await argon.hash(password, { type: argon.argon2id });
  return hash;
}
type UserType = {
  id: string,
	username: string,
	hash_password: string,
	email: string,
	first_name: string,
	last_name: string,
	phone: string,
	is_active: boolean,
	role: Role,
	created_at: Date,
	updated_at: Date
}

module.exports = {
  up: async (queryInterface: QueryInterface) => {

    const userData: Array<UserType> = [
      {
        id: "8731c5ce-2dcb-47da-8efd-ff0e07a6b050",
        username: "test1",
        hash_password: await hashPassword("1234"),
        email: "test1@gmail.com",
        first_name: "test1",
        last_name: "test1",
        phone: "0999321232",
        is_active: true,
        role: Role.USER,
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
        role: Role.ADMIN,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]

    return queryInterface.bulkInsert('user',
      userData)
  },

  down: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('user', null, {})
  }
};
