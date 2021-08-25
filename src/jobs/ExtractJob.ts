import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/entities/user.entity';
import { Extract } from 'src/entities/extract.entity';
import { Between, Repository } from 'typeorm';
import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';

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
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    const yerterday = this.getYesterday();

    const users = await this.loadUsers();
    users.forEach(async (user) => {
      const extract = await this.extractRepository.findOne({
        order: { created_at: 'DESC' },
        select: ['created_at'],
      });

      if (!this.compareDate(extract.created_at)) {
        const depositsStatements = await this.statementRepository.find({
          where: {
            user: user,
            created_at: Between(yerterday.start, yerterday.end),
          },
        });

        const expiredStatements = await this.statementRepository.find({
          where: {
            user: user,
            expiration_date: yerterday.expiration,
            kind: 1,
          },
        });

        const expired =
          expiredStatements.reduce(
            (acc, statement) => acc + Number(statement.amount),
            0,
          ) || 0;

        const deposited =
          depositsStatements.reduce((acc, statement) => {
            if (statement.kind == 1) return acc + Number(statement.amount);
          }, 0) || 0;

        const withdraw =
          depositsStatements.reduce((acc, statement) => {
            if (statement.kind == 0) return acc + Number(statement.amount);
          }, 0) || 0;

        await this.extractRepository.save({
          created_at: new Date(),
          updated_at: new Date(),
          user: user,
          date_day: yerterday.expiration,
          deposit: deposited,
          expired: expired,
          withdrawals: withdraw,
        });
      }
    });
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

  compareDate(date: Date): boolean {
    const date1 = new Date(date);
    const date2 = new Date();
    return (
      date1.getFullYear() == date2.getFullYear() &&
      date1.getMonth() == date2.getMonth() &&
      date1.getDate() == date2.getDate()
    );
  }

  async loadUsers() {
    return await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
      },
      select: ['id'],
    });
  }
}
