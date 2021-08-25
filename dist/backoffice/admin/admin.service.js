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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../../entities/admin.entity");
const AdminRoles_1 = require("../../enums/AdminRoles");
const bcrypt = require("bcrypt");
const mfa_service_1 = require("../../utils/mfa/mfa.service");
const MfaInterface_1 = require("../../utils/mfa/MfaInterface");
const generatePassword = require("generate-password");
const pagination_service_1 = require("../../utils/pagination/pagination.service");
const sendMail_producer_service_1 = require("../../jobs/producers/sendMail-producer-service");
let AdminService = class AdminService {
    constructor(adminRepository, mfaService, paginationService, sendMailProducer) {
        this.adminRepository = adminRepository;
        this.mfaService = mfaService;
        this.paginationService = paginationService;
        this.sendMailProducer = sendMailProducer;
    }
    async create(createAdminDto) {
        if (createAdminDto.admin.password !==
            createAdminDto.admin.password_confirmation) {
            return { message: 'Passwords não são iguais.' };
        }
        try {
            if (await this.findByEmail(createAdminDto.admin.email)) {
                return { message: 'Email já cadastrado.' };
            }
            const token = this.mfaService.generateSecret();
            const admin = new admin_entity_1.Admin();
            admin.email = createAdminDto.admin.email;
            admin.password_digest = bcrypt.hashSync(createAdminDto.admin.password + process.env.PASSWORD_SALT, 8);
            admin.roles = AdminRoles_1.AdminRole[createAdminDto.admin.roles.toUpperCase()];
            admin.status = createAdminDto.admin.status;
            admin.last_otp_at = new Date();
            admin.update_password_time = new Date();
            admin.otp_secret = token.base32;
            admin.token = token.hex;
            admin.token_reset = token.ascii;
            await this.adminRepository.save(admin);
            return { message: 'Admin registrado com sucesso! ' };
        }
        catch (error) {
            console.error('AdminService::create::error::', error);
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Ops. Ocorreu um erro inesperado.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(page = 1) {
        var _a;
        const limit = 10;
        try {
            const count = await this.adminRepository.count();
            const data = (_a = (await this.adminRepository.find({
                skip: (page - 1) * limit,
                take: limit,
                order: { id: 'DESC' },
            }))) === null || _a === void 0 ? void 0 : _a.map((admin) => {
                return this.adminMapper(admin);
            });
            return {
                data,
                currentPage: page,
                size: Math.ceil(count / limit),
                links: this.paginationService.pagination('v1/backoffice/admins', page, limit, count),
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Ops. Ocorreu um erro inesperado.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async me(email) {
        try {
            return this.adminMapper(await this.adminRepository.findOne({
                email: email,
            }));
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Ops. Ocorreu um erro inesperado.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return this.adminMapper(await this.adminRepository.findOne(id));
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Ops. Ocorreu um erro inesperado.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async forgetPassword(email) {
        try {
            const admin = await this.findByEmail(email);
            if (!admin) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'Admin não encontrado.',
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            const password = this.generatePassword();
            const password_digest = bcrypt.hashSync(password + process.env.PASSWORD_SALT, 8);
            await this.adminRepository.update(admin.id, {
                password_digest: password_digest,
            });
            this.sendMailProducer.sendNewPasswordEmail(email, password);
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Ops. Ocorreu um erro inesperado.',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, createAdminDto) {
        try {
            const admin = await this.adminRepository.findOne({ id: id });
            if (!admin) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: 'Admin não encontrado.',
                }, common_1.HttpStatus.FORBIDDEN);
            }
            const resultAdmin = await this.findByEmail(createAdminDto.admin.email);
            if (resultAdmin && createAdminDto.admin.email != admin.email) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: 'E-mail já está sendo utilizado.',
                }, common_1.HttpStatus.FORBIDDEN);
            }
            const newAdmin = new admin_entity_1.Admin();
            newAdmin.email = createAdminDto.admin.email || admin.email;
            newAdmin.password_digest = createAdminDto.admin.password
                ? bcrypt.hashSync(createAdminDto.admin.password + process.env.PASSWORD_SALT, 8)
                : admin.password_digest;
            newAdmin.roles = createAdminDto.admin.roles
                ? AdminRoles_1.AdminRole[createAdminDto.admin.roles.toUpperCase()]
                : admin.roles;
            newAdmin.status = createAdminDto.admin.status || admin.status;
            newAdmin.last_otp_at = new Date();
            newAdmin.update_password_time = new Date();
            await this.adminRepository.update(admin.id, newAdmin);
            return { message: 'Admin atualizado com sucesso! ' };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.response.error || error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateByToken(email, createAdminDto) {
        try {
            const admin = await this.adminRepository.findOne({ email: email });
            if (!admin) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: 'Admin não encontrado.',
                }, common_1.HttpStatus.FORBIDDEN);
            }
            const resultAdmin = await this.findByEmail(createAdminDto.admin.email);
            if (resultAdmin) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: 'E-mail já está sendo utilizado.',
                }, common_1.HttpStatus.FORBIDDEN);
            }
            const newAdmin = new admin_entity_1.Admin();
            newAdmin.email = createAdminDto.admin.email || admin.email;
            newAdmin.password_digest = createAdminDto.admin.password
                ? bcrypt.hashSync(createAdminDto.admin.password + process.env.PASSWORD_SALT, 8)
                : admin.password_digest;
            newAdmin.roles = createAdminDto.admin.roles
                ? AdminRoles_1.AdminRole[createAdminDto.admin.roles.toUpperCase()]
                : admin.roles;
            newAdmin.status = createAdminDto.admin.status || admin.status;
            newAdmin.last_otp_at = new Date();
            newAdmin.update_password_time = new Date();
            await this.adminRepository.update(admin.id, newAdmin);
            return { message: 'Admin atualizado com sucesso! ' };
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: error.response.error || error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(email) {
        const admin = await this.adminRepository.findOne({ email: email });
        await this.adminRepository.update(admin.id, { status: false });
    }
    async findByEmail(email) {
        return await this.adminRepository.findOne({ email: email });
    }
    async findByToken(token) {
        return await this.adminRepository.findOne({ token: token });
    }
    async findById(id) {
        return await this.adminRepository.findOne(id);
    }
    async updateProfile(id, dto) {
        const newPassword = bcrypt.hashSync(dto.admin.new_password + process.env.PASSWORD_SALT, 8);
        await this.adminRepository.update(id, {
            password_digest: newPassword,
            email: dto.admin.email,
        });
        return 'ok';
    }
    adminMapper(admin) {
        var _a;
        return {
            id: admin === null || admin === void 0 ? void 0 : admin.id,
            email: admin === null || admin === void 0 ? void 0 : admin.email,
            status: admin === null || admin === void 0 ? void 0 : admin.status,
            roles: (_a = AdminRoles_1.AdminRole[admin === null || admin === void 0 ? void 0 : admin.roles]) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
            created_at: admin === null || admin === void 0 ? void 0 : admin.created_at,
            updated_at: admin === null || admin === void 0 ? void 0 : admin.updated_at,
        };
    }
    generatePassword() {
        return generatePassword.generate({
            length: 8,
            symbols: true,
            numbers: true,
        });
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('ADMIN_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        mfa_service_1.MfaService,
        pagination_service_1.PaginationService,
        sendMail_producer_service_1.SendMailProducerService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map