"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const quest_service_1 = require("./quest.service");
let QuestController = class QuestController {
    constructor(questService) {
        this.questService = questService;
    }
    findAll(req) {
        if (req.user.roles == 'spotify')
            return this.questService.findAll(req.user.id);
        throw new common_2.UnauthorizedException();
    }
    async update(req, res, id, body) {
        if (req.user.roles == 'spotify') {
            const result = await this.questService.update(req.user.id, id, body);
            if (result.hasError)
                return res.status(common_2.HttpStatus.UNAUTHORIZED).json(result);
            return res.status(common_2.HttpStatus.CREATED).json('ok');
        }
        throw new common_2.UnauthorizedException();
    }
};
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Get(),
    __param(0, common_2.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "findAll", null);
__decorate([
    common_2.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Post(),
    __param(0, common_2.Request()),
    __param(1, common_1.Res()),
    __param(2, common_2.Query('id')),
    __param(3, common_2.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], QuestController.prototype, "update", null);
QuestController = __decorate([
    common_2.Controller('v1/app/quests'),
    __metadata("design:paramtypes", [quest_service_1.QuestService])
], QuestController);
exports.QuestController = QuestController;
//# sourceMappingURL=quest.controller.js.map