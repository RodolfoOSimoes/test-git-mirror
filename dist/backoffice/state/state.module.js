"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const state_providers_1 = require("../../providers/state.providers");
let StateModule = StateModule_1 = class StateModule {
};
StateModule = StateModule_1 = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        providers: [...state_providers_1.stateProviders],
        exports: [StateModule_1],
    })
], StateModule);
exports.StateModule = StateModule;
//# sourceMappingURL=state.module.js.map