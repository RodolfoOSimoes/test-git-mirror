"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBadgeChallengeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_badge_challenge_dto_1 = require("./create-badge-challenge.dto");
class UpdateBadgeChallengeDto extends mapped_types_1.PartialType(create_badge_challenge_dto_1.CreateBadgeChallengeDto) {
}
exports.UpdateBadgeChallengeDto = UpdateBadgeChallengeDto;
//# sourceMappingURL=update-badge-challenge.dto.js.map