"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModule = void 0;
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const location_controller_1 = require("./location.controller");
const database_module_1 = require("../../database/database.module");
const state_providers_1 = require("../../providers/state.providers");
const city_providers_1 = require("../../providers/city.providers");
let LocationModule = class LocationModule {
};
LocationModule = __decorate([
    common_1.Module({
        imports: [database_module_1.DatabaseModule],
        controllers: [location_controller_1.LocationController],
        providers: [...state_providers_1.stateProviders, ...city_providers_1.cityProviders, location_service_1.LocationService],
    })
], LocationModule);
exports.LocationModule = LocationModule;
//# sourceMappingURL=location.module.js.map