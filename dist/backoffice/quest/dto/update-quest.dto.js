"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_quest_dto_1 = require("./create-quest.dto");
class UpdateQuestDto extends mapped_types_1.PartialType(create_quest_dto_1.CreateQuestDto) {
}
exports.UpdateQuestDto = UpdateQuestDto;
//# sourceMappingURL=update-quest.dto.js.map