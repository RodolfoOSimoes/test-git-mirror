"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatementDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_statement_dto_1 = require("./create-statement.dto");
class UpdateStatementDto extends mapped_types_1.PartialType(create_statement_dto_1.CreateStatementDto) {
}
exports.UpdateStatementDto = UpdateStatementDto;
//# sourceMappingURL=update-statement.dto.js.map