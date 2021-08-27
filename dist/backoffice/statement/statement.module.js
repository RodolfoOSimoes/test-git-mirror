"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementModule = void 0;
const common_1 = require("@nestjs/common");
const statement_service_1 = require("./statement.service");
const statement_controller_1 = require("./statement.controller");
const database_module_1 = require("../../database/database.module");
const statement_providers_1 = require("../../providers/statement.providers");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
let StatementModule = class StatementModule {
};
StatementModule = __decorate([
    common_1.Module({
        controllers: [statement_controller_1.StatementController],
        imports: [database_module_1.DatabaseModule],
        providers: [...statement_providers_1.statementProviders, statement_service_1.StatementService, pagination_service_1.PaginationService],
    })
], StatementModule);
exports.StatementModule = StatementModule;
//# sourceMappingURL=statement.module.js.map