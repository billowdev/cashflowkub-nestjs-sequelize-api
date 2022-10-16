"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSession = void 0;
const common_1 = require("@nestjs/common");
exports.GetSession = (0, common_1.createParamDecorator)((data, ctx) => {
    try {
        const request = ctx.switchToHttp().getRequest();
        if (data) {
            return request.user[data];
        }
        else {
            return request.user;
        }
    }
    catch (error) {
        throw new common_1.ForbiddenException();
    }
});
//# sourceMappingURL=auth.decorator.js.map