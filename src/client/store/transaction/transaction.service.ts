import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Statement } from 'src/entities/statement.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { generateCode } from 'src/utils/code.utils';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { formatDate, prepareDate } from 'src/utils/date.utils';
import { generateBalance } from 'src/utils/balance.utils';
import { LogrescueService } from './logrescue.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class TransactionService {
  static transactionLimit = 10;
  static transactionUser = [];
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productsRepository: Repository<Product>,
    private sendMailProducer: SendMailProducerService,
    private readonly logrescuesService: LogrescueService,
  ) {}

  async create(user_id: number, code: string) {

    const data_user_start = new Date();

    const product = await this.productsRepository.findOne({
      where: { code_product: code },
    });

    this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Iniciando tentativa de resgate");

    if (product.quantities_purchased >= product.quantity) {

      this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Produto esgotado");

      throw new UnauthorizedException('Produto esgotado.');
    }

    if (TransactionService.transactionLimit <= 0) {

      this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Tente novamente em alguns instantes");

      throw new UnauthorizedException('Tente novamente em alguns instantes.');
    }

    if (!TransactionService.transactionUser.includes(user_id)) {
      TransactionService.transactionUser.push(user_id);
    } else {

      this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Você já fez uma solicitação para resgate desse produto em outra sessão");

      throw new UnauthorizedException(
        'Você já fez uma solicitação para resgate desse produto em outra sessão.',
      );
    }

    TransactionService.transactionLimit--;

    try {
      const user = await this.productsRepository.manager.findOne(User, {
        where: { id: user_id },
      });

      if (!user) {
        
        this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Usuário não encontrado");

        throw new UnauthorizedException('Usuário não encontrado.');
      }

      if (!user.email) {

        this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Necessário cadastrar email.");

        throw new UnauthorizedException('Necessário cadastrar email.');
      }

      const statement = await this.productsRepository.manager.findOne(
        Statement,
        {
          where: { user: user, statementable_type: 'Product' },
          order: { id: 'DESC' },
        },
      );

      if (this.isntAllowToBuy(statement)) {

        this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Só pode comprar 1 produto por dia.");

        throw new UnauthorizedException('Só pode comprar 1 produto por dia.');
      }

      await this.purchaseValidation(product, user, data_user_start);

      await this.incrementProduct(code, user_id, data_user_start);

      await this.buyProduct(code, user, product);
    } catch (err) {
      this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, err.message);
      throw new UnauthorizedException(err.message);
    } finally {
      const userIndex = TransactionService.transactionUser.findIndex(
        (id) => id == user_id,
      );
      if (userIndex != -1)
        TransactionService.transactionUser.splice(userIndex, 1);
      TransactionService.transactionLimit++;
    }

    this.logrescuesService.create(user_id, product.id, 1, data_user_start, product.quantity, "Produto resgatado com sucesso.");

    return { message: 'Produto resgatado com sucesso.' };
  }

  async incrementProduct(code, user_id, data_user_start) {
    await this.productsRepository.manager.transaction(
      'SERIALIZABLE',
      async (manager) => {
        const product = await manager.findOne(Product, {
          where: { code_product: code },
        });
        if (product.quantities_purchased < product.quantity) {
          await manager.update(Product, product.id, {
            quantities_purchased: product.quantities_purchased + 1,
          });
        } else {
          console.log("aqui 135");
          this.logrescuesService.create(user_id, product.id, 0, data_user_start, product.quantity, "Produto esgotado.");
          throw new UnauthorizedException('Produto esgotado.');
        }
      },
    );
  }

  async buyProduct(code, user, product) {
    try {
      const address = await this.productsRepository.manager.findOne(Address, {
        where: { user: user },
        order: { id: 'DESC' },
        relations: ['city', 'city.state'],
      });

      const campaign = await this.productsRepository.manager.findOne(Campaign, {
        status: true,
        date_start: LessThanOrEqual(formatDate(new Date())),
        date_finish: MoreThanOrEqual(formatDate(new Date())),
      });

      await this.productsRepository.manager.save(Statement, {
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

      const order = await this.productsRepository.manager.save(Order, {
        user: user,
        product: product,
        created_at: new Date(),
        updated_at: new Date(),
        sent: false,
        confirmation_email: true,
        code_secret: generateCode(50),
        price_of_product: product.value,
      });

      await this.productsRepository.manager.update(Address, address.id, {
        order: order,
      });

      this.sendMailProducer.sendOrderEmail(user, product, address);
    } catch (error) {}
  }

  shouldRetryTransaction(err: unknown) {
    const code = typeof err === 'object' ? String((err as any).code) : null;
    return code === '40001' || code === '40P01';
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
      const buyDate = moment(statement.created_at)
        .utcOffset('-0300')
        .format('YYYY-MM-DD');
      const today = moment(new Date()).format('YYYY-MM-DD');
      return buyDate == today;
    } catch (error) {
      return true;
    }
  }

  async purchaseValidation(product, user, data_user_start) {
    const withdrawals = await this.productsRepository.manager.find(Withdrawal, {
      where: {
        user: user,
        date_spent: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD')),
      },
    });

    const statements = await this.productsRepository.manager.find(Statement, {
      where: {
        user: user,
        kind: 1,
        expiration_date: MoreThanOrEqual(prepareDate()),
      },
    });

    const balance = generateBalance(statements, withdrawals) || 0;

    if (balance < product.value) {
      this.logrescuesService.create(user.id, product.code_product, 0, data_user_start, product.quantity, "Saldo insuficiente.");

      throw new UnauthorizedException('Saldo insuficiente.');
    }
  }
}
