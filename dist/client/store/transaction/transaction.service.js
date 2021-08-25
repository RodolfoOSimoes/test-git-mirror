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
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../entities/user.entity");
const statement_entity_1 = require("../../../entities/statement.entity");
const typeorm_1 = require("typeorm");
const address_entity_1 = require("../../../entities/address.entity");
const order_entity_1 = require("../../../entities/order.entity");
const product_entity_1 = require("../../../entities/product.entity");
const code_utils_1 = require("../../../utils/code.utils");
const sendMail_producer_service_1 = require("../../../jobs/producers/sendMail-producer-service");
const withdrawals_entity_1 = require("../../../entities/withdrawals.entity");
let TransactionService = class TransactionService {
    constructor(userRepository, statementRepository, addressRepository, orderRepository, productRepository, withdrawRepository, sendMailProducer) {
        this.userRepository = userRepository;
        this.statementRepository = statementRepository;
        this.addressRepository = addressRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.withdrawRepository = withdrawRepository;
        this.sendMailProducer = sendMailProducer;
    }
    async create(user_id, code) {
        const user = await this.userRepository.findOne(user_id);
        const address = await this.addressRepository.findOne({
            where: { user: user },
            order: { id: 'DESC' },
            relations: ['city', 'city.state'],
        });
        const product = await this.productRepository.findOne({
            where: { code_product: code },
        });
        await this.statementRepository.save({
            user: user,
            amount: product.value,
            kind: 0,
            balance: 0,
            statementable_type: 'Product',
            statementable_id: product.id,
            delete: false,
            created_at: new Date(),
            updated_at: new Date(),
        });
        const order = await this.orderRepository.save({
            user: user,
            product: product,
            created_at: new Date(),
            updated_at: new Date(),
            sent: false,
            confirmation_email: true,
            code_secret: code_utils_1.generateCode(50),
        });
        await this.addressRepository.update(address.id, {
            order: order,
        });
        await this.productRepository.update(product.id, {
            quantities_purchased: product.quantities_purchased + 1,
        });
        this.sendMailProducer.sendOrderEmail(user, product, address);
        return 'This action adds a new transaction';
    }
};
TransactionService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('USER_REPOSITORY')),
    __param(1, common_1.Inject('STATEMENT_REPOSITORY')),
    __param(2, common_1.Inject('ADDRESS_REPOSITORY')),
    __param(3, common_1.Inject('ORDER_REPOSITORY')),
    __param(4, common_1.Inject('PRODUCT_REPOSITORY')),
    __param(5, common_1.Inject('WITHDRAWAL_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        sendMail_producer_service_1.SendMailProducerService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map