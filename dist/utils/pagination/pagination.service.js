"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const common_1 = require("@nestjs/common");
let PaginationService = class PaginationService {
    pagination(route, page = 1, limit, count) {
        const current = page;
        const last = Math.ceil(count / limit);
        return {
            self: `${process.env.FILTRGAME_URL}/${route}?page=${page}`,
            first: `${process.env.FILTRGAME_URL}/${route}?page=1`,
            prev: current != 1
                ? `${process.env.FILTRGAME_URL}/${route}?page=${--page}`
                : null,
            next: current == last
                ? `${process.env.FILTRGAME_URL}/${route}?page=${++page}`
                : null,
            last: `${process.env.FILTRGAME_URL}/${route}?page=${last}`,
        };
    }
};
PaginationService = __decorate([
    common_1.Injectable()
], PaginationService);
exports.PaginationService = PaginationService;
//# sourceMappingURL=pagination.service.js.map