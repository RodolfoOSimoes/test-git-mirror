import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Statement } from 'src/entities/statement.entity';
import {
  EntityManager,
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
import { IsolationLevel } from 'typeorm-transactional-cls-hooked';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class TransactionService {
  static productLimit = 6;
  static transactionLimit = 10;
  static transactionUser = [];
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productsRepository: Repository<Product>,
    private sendMailProducer: SendMailProducerService,
  ) {}

  async create(user_id: number, code: string) {
    const product = await this.productsRepository.findOne({
      where: { code_product: code },
    });

    if (product.quantities_purchased >= product.quantity) {
      throw new UnauthorizedException('Produto esgotado.');
    }

    if (TransactionService.transactionLimit <= 0) {
      throw new UnauthorizedException('Tente novamente em alguns instantes.');
    }

    if (!TransactionService.transactionUser.includes(user_id)) {
      TransactionService.transactionUser.push(user_id);
    } else {
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
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      if (!user.email) {
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
        throw new UnauthorizedException('Só pode comprar 1 produto por dia.');
      }

      await this.purchaseValidation(product, user);

      await this.incrementProduct(code);

      await this.buyProduct(code, user, product);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    } finally {
      const userIndex = TransactionService.transactionUser.findIndex(
        (id) => id == user_id,
      );
      if (userIndex != -1)
        TransactionService.transactionUser.splice(userIndex, 1);
      TransactionService.transactionLimit++;
    }

    return { message: 'Produto resgatado com sucesso.' };
    // if (!product) {
    //   throw new UnauthorizedException('Produto não encontrado.');
    // }

    // if (product.quantity <= product.quantities_purchased) {
    //   throw new UnauthorizedException('Produto indisponível.');
    // }

    // if (TransactionService.transactionLimit <= 0) {
    //   throw new UnauthorizedException('Tente novamente em alguns instantes.');
    // }

    // if (!TransactionService.transactionUser.includes(user_id)) {
    //   TransactionService.transactionUser.push(user_id);
    // } else {
    //   throw new UnauthorizedException('Você já está realizando um resgate.');
    // }

    // TransactionService.transactionLimit--;

    // await this.productsRepository.update(product.id, {
    //   quantities_purchased: product.quantities_purchased + 1,
    // });

    // product = await this.productsRepository.findOne({
    //   where: { code_product: code },
    // });

    // if (product.quantity < product.quantities_purchased) {
    //   const userIndex = TransactionService.transactionUser.findIndex(
    //     (id) => id == user_id,
    //   );
    //   if (userIndex != -1)
    //     TransactionService.transactionUser.splice(userIndex, 1);
    //   TransactionService.transactionLimit++;
    //   throw new UnauthorizedException('Produto indisponível.');
    // }

    // const connection = getConnection();
    // const queryRunner = connection.createQueryRunner();
    // await queryRunner.connect();
    // try {
    //   await queryRunner.startTransaction(IsolationLevel.READ_COMMITTED);

    //   const user = await queryRunner.manager.findOne(User, {
    //     where: { id: user_id },
    //   });

    //   const address = await queryRunner.manager.findOne(Address, {
    //     where: { user: user },
    //     order: { id: 'DESC' },
    //     relations: ['city', 'city.state'],
    //   });

    //   const campaign = await queryRunner.manager.findOne(Campaign, {
    //     status: true,
    //     date_start: LessThanOrEqual(formatDate(new Date())),
    //     date_finish: MoreThanOrEqual(formatDate(new Date())),
    //   });

    //   const product = await queryRunner.manager.findOne(Product, {
    //     where: { code_product: code },
    //   });

    //   await this.purchaseValidation(product, user, queryRunner);

    //   const statement = await queryRunner.manager.findOne(Statement, {
    //     where: { user: user, statementable_type: 'Product' },
    //     order: { id: 'DESC' },
    //   });

    //   if (this.isntAllowToBuy(statement)) {
    //     throw new UnauthorizedException('Só pode comprar 1 produto por dia.');
    //   }

    //   await queryRunner.manager.save(Statement, {
    //     user: user,
    //     amount: product.value,
    //     kind: 0,
    //     balance: 0,
    //     statementable_type: 'Product',
    //     statementable_id: product.id,
    //     delete: false,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     campaign: campaign,
    //   });

    //   const order = await queryRunner.manager.save(Order, {
    //     user: user,
    //     product: product,
    //     created_at: new Date(),
    //     updated_at: new Date(),
    //     sent: false,
    //     confirmation_email: true,
    //     code_secret: generateCode(50),
    //     price_of_product: product.value,
    //   });

    //   await queryRunner.manager.update(Address, address.id, {
    //     order: order,
    //   });

    //   await queryRunner.commitTransaction();
    //   this.sendMailProducer.sendOrderEmail(user, product, address);
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    //   throw new ForbiddenException({ message: error.message });
    // } finally {
    //   await queryRunner.release();
    //   const userIndex = TransactionService.transactionUser.findIndex(
    //     (id) => id == user_id,
    //   );
    //   if (userIndex != -1)
    //     TransactionService.transactionUser.splice(userIndex, 1);
    //   TransactionService.transactionLimit++;
    // }
    // return { message: 'Produto resgatado com sucesso.' };
  }

  async incrementProduct(code) {
    await this.productsRepository.manager.transaction(
      'REPEATABLE READ',
      async (manager) => {
        const product = await manager.findOne(Product, {
          where: { code_product: code },
        });
        if (product.quantities_purchased < product.quantity) {
          await manager.update(Product, product.id, {
            quantities_purchased: product.quantities_purchased + 1,
          });
        } else {
          throw new UnauthorizedException('Produto esgotado.');
        }
      },
    );
  }

  async buyProduct(code, user, product) {
    // if (code == 'BheSrveEqyW') {
    //   TransactionService.productLimit--;
    //   if (TransactionService.productLimit <= 0) {
    //     console.log('limited');
    //     throw new UnauthorizedException('Produto esgotado.');
    //   }
    // }
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

  async purchaseValidation(product, user) {
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
      throw new UnauthorizedException('Saldo insuficiente.');
    }
  }
}
