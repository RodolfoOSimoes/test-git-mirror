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
const quest_service_1 = require("./quest.service");
const create_quest_dto_1 = require("./dto/create-quest.dto");
const update_quest_dto_1 = require("./dto/update-quest.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const AdminRoles_1 = require("../../enums/AdminRoles");
const common_2 = require("@nestjs/common");
let QuestController = class QuestController {
    constructor(questService) {
        this.questService = questService;
    }
    create(req, createQuestDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.create(req.user.id, createQuestDto);
        else
            throw new common_1.UnauthorizedException();
    }
    findAll(req, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.findAll(page);
        else
            throw new common_1.UnauthorizedException();
    }
    findOne(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.findOne(id);
        else
            throw new common_1.UnauthorizedException();
    }
    findUsers(req, id, page) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.findListUsers(id, page);
        else
            throw new common_1.UnauthorizedException();
    }
    update(req, id, updateQuestDto) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.update(req.user.id, id, updateQuestDto);
        else
            throw new common_1.UnauthorizedException();
    }
    remove(req, id) {
        if (req.user.roles === AdminRoles_1.AdminRole.MASTER)
            return this.questService.remove(id);
        else
            throw new common_1.UnauthorizedException();
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post(),
    __param(0, common_1.Request()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_quest_dto_1.CreateQuestDto]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "create", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __param(0, common_1.Request()),
    __param(1, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "findAll", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "findOne", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id/users'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "findUsers", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_2.Put(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_quest_dto_1.UpdateQuestDto]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "update", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Request()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], QuestController.prototype, "remove", null);
QuestController = __decorate([
    common_1.Controller('v1/backoffice/quests'),
    __metadata("design:paramtypes", [quest_service_1.QuestService])
], QuestController);
exports.QuestController = QuestController;
//# sourceMappingURL=quest.controller.js.map