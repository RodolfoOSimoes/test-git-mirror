import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/entities/user.entity';
import { Extract } from 'src/entities/extract.entity';
import {
  Between,
  In,
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async handleCron() {
    const yesterday = this.getYesterday();
    let iteration = 0;
    console.log('start: extractJob');
    while (true) {
      const users = await this.loadUsers(iteration);
      if (!users.length) {
        break;
      } else {
        iteration = users[users.length - 1].id;
      }
      await Promise.all([
        this.processExtracts(users.splice(0, 10), yesterday),
        this.processExtracts(users.splice(0, 10), yesterday),
        this.processExtracts(users.splice(0, 10), yesterday),
        this.processExtracts(users.splice(0, 10), yesterday),
        this.processExtracts(users.splice(0, 10), yesterday),
      ]);
    }
    console.log('finish: extractJob');
  }

  getYesterday() {
    return moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  }

  hasYesterdayExtract(date: Date, yesterday): boolean {
    if (!date) return false;
    const date1 = moment(date).format('YYYY-MM-DD');
    return date1 == yesterday;
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

  async processExtracts(users, yesterday) {
    for (const user of users) {
      try {
        const extract = await this.extractRepository.findOne({
          where: { user: user },
          order: { date_day: 'DESC' },
          select: ['date_day'],
        });

        if (!this.hasYesterdayExtract(extract.date_day, yesterday)) {
          const [deposit] = await this.statementRepository.query(
            `
          SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
        `,
            [yesterday, user.id, 1],
          );

          const [withdraw] = await this.statementRepository.query(
            `
          SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
        `,
            [yesterday, user.id, 0],
          );

          const [expired] = await this.statementRepository.query(
            `
          SELECT SUM(amount) AS amount FROM statements WHERE expiration_date = ? AND user_id = ? AND kind = ?
        `,
            [yesterday, user.id, 1],
          );

          const [withdrawSpending] = await this.statementRepository.query(
            `
            SELECT SUM(spending) AS amount FROM withdrawals WHERE user_id = ? AND date_spent = ?
        `,
            [user.id, yesterday],
          );

          let expire = expired.amount || 0;

          if (withdrawSpending && withdrawSpending.amount) {
            const unExpired = expire - withdrawSpending.amount;
            expire = unExpired < 0 ? 0 : unExpired;
          }

          await this.extractRepository.save({
            created_at: new Date(),
            updated_at: new Date(),
            user: user,
            date_day: yesterday,
            deposit: deposit.amount || 0,
            expired: expire,
            withdrawal: withdraw.amount || 0,
          });

          await this.userRepository.update(user.id, {
            last_update_extract: new Date(),
          });
        }
      } catch (error) {
        console.log('ExtractJob::Error::', error.message);
      }
    }
  }
}
