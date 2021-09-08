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
import { formatDate } from 'src/utils/date.utils';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
    @Inject('CAMPAIGN_REPOSITORY')
    private campaignRepository: Repository<Campaign>,
    private sendMailProducer: SendMailProducerService,
  ) {}

  async create(user_id: number, code: string) {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    console.log(user.email);
    const address = await this.addressRepository.findOne({
      where: { user: user },
      order: { id: 'DESC' },
      relations: ['city', 'city.state'],
    });

    const campaign = await this.campaignRepository.findOne({
      status: true,
      date_start: LessThanOrEqual(formatDate(new Date())),
      date_finish: MoreThanOrEqual(formatDate(new Date())),
    });

    const product = await this.productRepository.findOne({
      where: { code_product: code },
    });

    console.log(product);

    if (product && product.quantity < product.quantities_purchased) {
      throw new UnauthorizedException('Produto indisponível.');
    }

    await this.productRepository.update(product.id, {
      quantities_purchased: product.quantities_purchased + 1,
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

    await this.withdrawRepository.save({
      user: user,
      date_spent: this.getToday(),
      spending: product.value,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.addressRepository.update(address.id, {
      order: order,
    });

    this.sendMailProducer.sendOrderEmail(user, product, address);

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
}
