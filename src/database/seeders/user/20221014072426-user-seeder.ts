'use strict';

import { Model, QueryInterface, Sequelize } from "sequelize/types";
import { UserAttributes, UserCreationAttributes, UserEntity } from "src/user/entities/user.entity";
import * as argon from 'argon2'
const hashPassword = async (password) => {
  const hash = await argon.hash(password, { type: argon.argon2id });
  return hash;
}
// class UserType extends Model<UserAttributes, UserCreationAttributes> {

// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: Sequelize) {

    const UserData: Array<any> = [
      {
        username: "test1",
        hashPassword: hashPassword("1234"),
        email: "test1@gmail.com",
        firstName: "test1",
        lastName: "test1",
        phone: "0999321232",
        isActive: true,
        role: "user",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "test2",
        hashPassword: hashPassword("1234"),
        email: "test2@gmail.com",
        firstName: "test2",
        lastName: "test2",
        phone: "0999321232",
        isActive: true,
        role: "user"
      }
    ]

    await queryInterface.bulkInsert('User',
      UserData,
      {});
  },

  async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
    try {
      await queryInterface.bulkDelete('User', null, {});
    } catch (error) {
      throw new Error(error)
    }
  }
};
