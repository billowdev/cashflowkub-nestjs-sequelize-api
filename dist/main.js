"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const config_1 = require("./core/config");
const common_1 = require("@nestjs/common");
const constants_1 = require("./core/constants");
const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
};
async function bootstrap() {
    var _a;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({
        logger: (_a = envToLogger[process.env.NODE_ENV]) !== null && _a !== void 0 ? _a : true
    }));
    const prefix = '/api/v1';
    app.setGlobalPrefix(prefix);
    const document = swagger_1.SwaggerModule.createDocument(app, config_1.swaggerConfig);
    swagger_1.SwaggerModule.setup(prefix, app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    await app.listen(constants_1.SERVEPORT, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map