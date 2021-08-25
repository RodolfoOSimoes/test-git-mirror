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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("../backoffice/admin/admin.service");
const AdminRoles_1 = require("../enums/AdminRoles");
const spotify_service_1 = require("../apis/spotify/spotify.service");
const user_service_1 = require("../client/user/user.service");
let AuthService = class AuthService {
    constructor(adminService, jwtService, userService, spotifyService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.spotifyService = spotifyService;
    }
    async validateAdmin(email, password) {
        const admin = await this.adminService.findByEmail(email);
        if (admin && bcrypt.compareSync(password, admin.password_digest)) {
            const { password_digest } = admin, result = __rest(admin, ["password_digest"]);
            return result;
        }
        return null;
    }
    async login(admin) {
        var _a;
        const payload = {
            id: admin.id,
            email: admin.email,
            roles: admin.roles,
            roleName: (_a = AdminRoles_1.AdminRole[admin.roles]) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
        };
        return this.jwtService.sign(payload);
    }
    async saveUser(requestInfo) {
        if (!requestInfo.body) {
            return { message: 'Necessário enviar código do spotify' };
        }
        const credentials = await this.spotifyService.authenticateUser(requestInfo.body);
        const userInfo = await this.spotifyService.getuserInfo(credentials['access_token']);
        userInfo.credentials = {
            token: credentials['access_token'],
            refresh_token: credentials['refresh_token'],
            expires: true,
            expires_in: new Date(new Date().getTime() + 3600000),
        };
        const user = await this.userService.create(requestInfo, userInfo);
        return {
            access_token: this.jwtService.sign({
                id: user.id,
                email: user.email,
                roles: 'spotify',
            }),
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        jwt_1.JwtService,
        user_service_1.UserService,
        spotify_service_1.SpotifyService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map