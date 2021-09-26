import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Statement } from 'src/entities/statement.entity';
import {
  getConnection,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { generateCode } from 'src/utils/code.utils';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { formatDate, prepareDate } from 'src/utils/date.utils';
import { generateBalance } from 'src/utils/balance.utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class TransactionService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private sendMailProducer: SendMailProducerService,
  ) {}

  async create(user_id: number, code: string) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });

    const statement = await this.statementRepository.findOne({
      where: { user: user, statementable_type: 'Product' },
      order: { id: 'DESC' },
    });

    if (this.isntAllowToBuy(statement)) {
      throw new UnauthorizedException('Só pode comprar 1 produto por dia.');
    }

    let product = await this.productRepository.findOne({
      where: { code_product: code },
    });

    if (product && product.quantity <= product.quantities_purchased) {
      throw new UnauthorizedException('Produto indisponível.');
    }

    await this.purchaseValidation(product, user);

    await this.productRepository.update(product.id, {
      quantities_purchased: product.quantities_purchased + 1,
    });

    product = await this.productRepository.findOne({
      where: { code_product: code },
    });

    if (product && product.quantity < product.quantities_purchased) {
      throw new UnauthorizedException('Produto indisponível.');
    }

    const address = await this.addressRepository.findOne({
      where: { user: user },
      order: { id: 'DESC' },
      relations: ['city', 'city.state'],
    });

    const campaign = await this.campaignRepository.findOne({
      where: {
        status: true,
        date_start: LessThanOrEqual(formatDate(new Date())),
        date_finish: MoreThanOrEqual(formatDate(new Date())),
      },
    });

    // const connection = getConnection();
    // const queryRunner = connection.createQueryRunner();
    // await queryRunner.startTransaction();
    try {
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
        campaign: campaign,
      });

      const order = await this.orderRepository.save({
        user: user,
        product: product,
        created_at: new Date(),
        updated_at: new Date(),
        sent: false,
        confirmation_email: true,
        code_secret: generateCode(50),
        price_of_product: product.value,
      });

      product = await this.productRepository.findOne({
        where: { code_product: code },
      });

      await this.addressRepository.update(address.id, {
        order: order,
      });

      await this.purchaseValidation(product, user);
      // await queryRunner.commitTransaction();
      this.sendMailProducer.sendOrderEmail(user, product, address);
    } catch (error) {
      // await queryRunner.rollbackTransaction();
      throw new ForbiddenException({ message: error.message });
    } finally {
      // await queryRunner.release();
    }

    return { message: 'Produto resgatado com sucesso.' };
  }

  getToday() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  }

  isntAllowToBuy(statement: Statement): boolean {
    if (!statement) return false;
    try {
      const buyDate = moment(statement.created_at).format('YYYY-MM-DD');
      const today = moment(new Date()).format('YYYY-MM-DD');
      return buyDate == today;
    } catch (error) {
      return true;
    }
  }

  async purchaseValidation(product, user) {
    const withdrawals = await this.withdrawRepository.find({
      where: {
        user: user,
        date_spent: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD')),
      },
    });

    const statements = await this.statementRepository.find({
      where: {
        user: user,
        kind: 1,
        expiration_date: MoreThanOrEqual(prepareDate()),
      },
    });

    const balance = generateBalance(statements, withdrawals) || 0;

    if (balance < product.value) {
      throw new UnauthorizedException('Saldo insuficiente.');
    }
  }
}
