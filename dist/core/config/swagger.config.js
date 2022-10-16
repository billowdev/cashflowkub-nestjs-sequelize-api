"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('personal financial management system restfulapi')
    .setDescription('personal financial management system restfulapi')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('Akkarapon Phikulsri (BillowDev)', 'billowdev.com', 'lacakira@gmail.com')
    .build();
//# sourceMappingURL=swagger.config.js.map