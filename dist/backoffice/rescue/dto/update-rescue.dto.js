"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRescueDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_rescue_dto_1 = require("./create-rescue.dto");
class UpdateRescueDto extends mapped_types_1.PartialType(create_rescue_dto_1.CreateRescueDto) {
}
exports.UpdateRescueDto = UpdateRescueDto;
//# sourceMappingURL=update-rescue.dto.js.map