"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserGratificationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_gratification_dto_1 = require("./create-user-gratification.dto");
class UpdateUserGratificationDto extends mapped_types_1.PartialType(create_user_gratification_dto_1.CreateUserGratificationDto) {
}
exports.UpdateUserGratificationDto = UpdateUserGratificationDto;
//# sourceMappingURL=update-user-gratification.dto.js.map