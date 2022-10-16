"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDebtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_debt_dto_1 = require("./create-debt.dto");
class UpdateDebtDto extends (0, swagger_1.PartialType)(create_debt_dto_1.CreateDebtDto) {
}
exports.UpdateDebtDto = UpdateDebtDto;
//# sourceMappingURL=update-debt.dto.js.map