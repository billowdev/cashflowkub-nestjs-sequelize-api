"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.SERVEPORT = exports.PRODUCTION = exports.TEST = exports.DEVELOPMENT = exports.SEQUELIZE = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.SEQUELIZE = 'SEQUELIZE';
exports.DEVELOPMENT = 'development';
exports.TEST = 'test';
exports.PRODUCTION = 'production';
exports.SERVEPORT = process.env.PORT;
exports.CLIENT_URL = process.env.CLIENT_URL;
//# sourceMappingURL=config.constant.js.map