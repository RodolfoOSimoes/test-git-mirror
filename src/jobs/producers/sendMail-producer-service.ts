import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('sendMail-queue') private tokenQueue: Queue) {}

  async sendToken(to: string, token: string) {
    const data = {
      to: to,
      token: token,
    };
    await this.tokenQueue.add('sendMail-job', data);
  }

  async sendOrderEmail(user: User, product: Product, address: Address) {
    const data = {
      user: user,
      product: product,
      address: address,
    };
    await this.tokenQueue.add('sendOrderMail-job', data);
  }

  async sendNewPasswordEmail(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    await this.tokenQueue.add('sendNewPasswordMail-job', data);
  }

  async sendReportEmail(buffer, email, name) {
    const data = {
      buffer: buffer,
      email: email,
      name: name,
    };
    await this.tokenQueue.add('sendAnalyticsMail-job', data);
  }
}
