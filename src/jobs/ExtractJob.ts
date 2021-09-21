import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/entities/user.entity';
import { Extract } from 'src/entities/extract.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class ExtractJob {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('EXTRACT_REPOSITORY')
    private extractRepository: Repository<Extract>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const yesterday = this.getYesterday();
    const iteration = 0;

    // while (true) {
    //   const users = await this.loadUsers(iteration);
    //   if (!users.length) {
    //     break;
    //   } else {
    //     iteration = users[users.length - 1].id;
    //   }
    //   console.log('extract');
    //   for (const user of users) {
    //     try {
    //       const extract = await this.extractRepository.findOne({
    //         where: { user: user },
    //         order: { date_day: 'DESC' },
    //         select: ['date_day'],
    //       });

    //       if (!this.hasYesterdayExtract(extract.date_day)) {
    //         const [deposit] = await this.statementRepository.query(
    //           `
    //         SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
    //       `,
    //           [yesterday.expiration, user.id, 1],
    //         );

    //         const [withdraw] = await this.statementRepository.query(
    //           `
    //         SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
    //       `,
    //           [yesterday.expiration, user.id, 0],
    //         );

    //         const [expired] = await this.statementRepository.query(
    //           `
    //         SELECT SUM(amount) AS amount FROM statements WHERE expiration_date = ? AND user_id = ? AND kind = ?
    //       `,
    //           [yesterday.expiration, user.id, 1],
    //         );

    //         await this.extractRepository.save({
    //           created_at: new Date(),
    //           updated_at: new Date(),
    //           user: user,
    //           date_day: yesterday.expiration,
    //           deposit: deposit.amount || 0,
    //           expired: expired.amount || 0,
    //           withdrawal: withdraw.amount || 0,
    //         });

    //         await this.userRepository.update(user.id, {
    //           last_update_extract: new Date(),
    //         });
    //       }
    //     } catch (error) {
    //       console.log('ExtractJob::Error::', error.message);
    //     }
    //   }
    // }
  }

  getYesterday() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    const year = date.getFullYear();
    const formatedData = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return {
      start: `${formatedData} 00:00:00`,
      end: `${formatedData} 23:59:59`,
      expiration: formatedData,
    };
  }

  hasYesterdayExtract(date: Date): boolean {
    if (!date) return false;
    const date1 = moment(date).format('YYYY-MM-DD');
    const date2 = moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
    return date1 == date2;
  }

  async loadUsers(id: number) {
    return await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
        id: MoreThan(id),
      },
      take: 50,
      select: ['id'],
    });
  }
}
