"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PocketModule = void 0;
const common_1 = require("@nestjs/common");
const pocket_service_1 = require("./pocket.service");
const pocket_controller_1 = require("./pocket.controller");
const pocket_providers_1 = require("./entities/pocket.providers");
let PocketModule = class PocketModule {
};
PocketModule = __decorate([
    (0, common_1.Module)({
        controllers: [pocket_controller_1.PocketController],
        providers: [pocket_service_1.PocketService, ...pocket_providers_1.pocketProviders],
        exports: [pocket_service_1.PocketService]
    })
], PocketModule);
exports.PocketModule = PocketModule;
//# sourceMappingURL=pocket.module.js.map