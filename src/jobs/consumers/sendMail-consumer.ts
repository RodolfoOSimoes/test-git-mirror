import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { Product } from 'src/entities/product.entity';
import { Statement } from 'src/entities/statement.entity';
import { User } from 'src/entities/user.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(
    private mailService: MailerService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
  ) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job) {
    const { data } = job;

    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.to,
        subject: 'Código de validação',
        html: `<h1>Código de validação: ${data.token}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Process('sendNewPasswordMail-job')
  async sendNewPasswordMail(job: Job) {
    const { data } = job;

    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.email,
        subject: 'Nova senha gerada com sucesso',
        html: `<h1>Nova senha gerada com sucesso: ${data.password.toString()}</h1>`,
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  @Process('sendOrderMail-job')
  async sendOrderMailJob(job: Job) {
    const { data } = job;
    try {
      await this.processWithdraw(data.user, data.product);

      const html = `Oi! ${data?.user?.name}<br><br>
       
       Seu resgate foi confirmado :)<br><br>
       
       Obrigada por participar do Filtr Game! Agora vamos separar seu resgate e em breve ele será entregue a transportadora.<br>
       
       Entrega de 7 a 30 dias úteis.<br><br>
    
       <b>${data?.product?.name}</b><br>
    
       f$ ${data?.product?.value}<br><br>
    
       Frete grátis<br>
    
       ${data?.address?.street}<br>
    
       Número: ${data?.address?.number}<br>

       Bairro: ${data?.address?.neighborhood}<br>

       Complemento: ${data?.address?.complement}<br>

       Cep: ${data?.address?.cep}<br>

       ${data?.address?.city?.name} - ${data?.address?.city?.state?.acronym}

       <br><br>
       Continue ligado nas novidades do <a href="${process.env.FILTRGAME_URL}" target="_blank">Filtr Game</a>.
       <br><br>
       Grande abraço! :-)`;

      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: data.user.email,
        subject: 'Recebemos seu pedido!',
        html: html,
      });
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  }

  @Process('sendAnalyticsMail-job')
  async sendReportEmail(job: Job) {
    const { data } = job;
    try {
      await this.mailService.sendMail({
        from: `"Filtrgame" <filtrgame@sonymusic.com>`,
        to: 'joilson.leal@druid.com.br',
        subject: `[Hits do momento]: ${data.name} analytics`,
        html: 'Seu download está pronto.',
        attachments: [
          {
            filename: `users_${moment(new Date()).format('YYYY-MM-DD')}.xlsx`,
            content: Buffer.from(data.buffer),
            contentType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        ],
      });
    } catch (error) {
      throw Error(error.message);
    }
  }

  async processWithdraw(user: User, product: Product) {
    try {
      const withdrawal = await this.withdrawRepository.findOne({
        where: {
          user: user,
        },
        order: { date_spent: 'DESC' },
      });

      const date_start = withdrawal
        ? withdrawal.date_spent
        : moment(new Date()).format('YYYY-MM-DD');

      const statements = await this.statementRepository.find({
        where: {
          user: user,
          expiration_date: MoreThan(date_start),
          kind: 1,
        },
        select: ['amount', 'expiration_date'],
        order: { expiration_date: 'ASC' },
      });

      let product_value = Number(product.value);

      if (withdrawal) {
        const statements = await this.statementRepository.find({
          where: {
            user: user,
            expiration_date: date_start,
            kind: 1,
          },
          select: ['amount', 'expiration_date'],
          order: { expiration_date: 'ASC' },
        });

        let value = statements.reduce(
          (acc, statement) => acc + Number(statement.amount),
          0,
        );

        const withdrawals = await this.withdrawRepository.find({
          where: {
            user: user,
            date_spent: date_start,
          },
          select: ['spending'],
        });

        const withdralDaySpending = withdrawals.reduce(
          (acc, withdraw) => acc + Number(withdraw.spending),
          0,
        );

        value -= withdralDaySpending;

        if (value > product_value) {
          value = product_value;
          product_value = 0;
        }

        if (value > 0) {
          await this.withdrawRepository.save({
            created_at: new Date(),
            updated_at: new Date(),
            spending: value,
            date_spent: date_start,
            user: user,
          });

          product_value -= value;
        }
      }

      const whidrawls = [];

      for (const statement of statements) {
        if (product_value <= 0) break;

        const hasStatement = whidrawls.find(
          (withdraw) => withdraw.date_spent == statement.expiration_date,
        );
        const value =
          product_value >= Number(statement.amount)
            ? Number(statement.amount)
            : product_value;

        if (hasStatement) {
          hasStatement.amount += value;
        } else {
          whidrawls.push({
            date_spent: statement.expiration_date,
            amount: value,
          });
        }
        product_value -= value;
      }

      for (const withdraw of whidrawls) {
        await this.withdrawRepository.save({
          created_at: new Date(),
          updated_at: new Date(),
          spending: withdraw.amount,
          date_spent: withdraw.date_spent,
          user: user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
