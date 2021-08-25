import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Statement } from 'src/entities/statement.entity';
import { Repository } from 'typeorm';
import { Address } from 'src/entities/address.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { generateCode } from 'src/utils/code.utils';
import { SendMailProducerService } from 'src/jobs/producers/sendMail-producer-service';
import { Withdrawal } from 'src/entities/withdrawals.entity';

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
    private sendMailProducer: SendMailProducerService,
  ) {}

  async create(user_id: number, code: string) {
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
      code_secret: generateCode(50),
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
}
