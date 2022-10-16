"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePocketDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_pocket_dto_1 = require("./create-pocket.dto");
class UpdatePocketDto extends (0, swagger_1.PartialType)(create_pocket_dto_1.CreatePocketDto) {
}
exports.UpdatePocketDto = UpdatePocketDto;
//# sourceMappingURL=update-pocket.dto.js.map