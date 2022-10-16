"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalGuard = void 0;
const passport_1 = require("@nestjs/passport");
class LocalGuard extends (0, passport_1.AuthGuard)('local') {
    constructor() {
        super();
    }
}
exports.LocalGuard = LocalGuard;
//# sourceMappingURL=local.guard.js.map