import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CashBackBalance } from 'src/entities/cash-backs-balance.entity';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { Statement } from 'src/entities/statement.entity';
import { User } from 'src/entities/user.entity';
import { In, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class CashBackBalanceJob {
  constructor(
    @Inject('CASH_BACK_REPOSITORY')
    private cashBackRepository: Repository<CashBack>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('RESCUE_REPOSITORY')
    private rescueRepository: Repository<Rescue>,
    @Inject('CASH_BACK_BALANCE_REPOSITORY')
    private cashBackBalanceRepository: Repository<CashBackBalance>,
  ) {}

  // @Cron('26 21 * * *')
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async handleCron() {
    const yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');

    const users = await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
      },
      select: ['id'],
    });

    for (const user of users) {
      const statements = await this.statementRepository.query(
        `
      SELECT SUM(amount) AS amount, statementable_id FROM statements
      WHERE user_id = ? AND statementable_type = 'CashBack' AND
      DATE(CONVERT_TZ(created_at , 'UTC', 'America/Sao_Paulo')) = ?
      GROUP BY statementable_id
      `,
        [user.id, yesterday],
      );

      const cashBackBalances: CashBackBalance[] = [];

      statements.forEach((statement) => {
        const cashbackBalance = new CashBackBalance();
        cashbackBalance.balance = Number(statement.amount);
        cashbackBalance.rescue_id = statement.statementable_id;
        cashbackBalance.user_id = user.id;
        cashbackBalance.created_at = new Date();
        cashbackBalance.updated_at = new Date();
        cashBackBalances.push(cashbackBalance);
      });

      console.log(cashBackBalances);

      await this.saveOrUpdateCashBackBalance(cashBackBalances);
    }
  }

  async saveOrUpdateCashBackBalance(CashBackBalances: CashBackBalance[]) {
    if (!CashBackBalances.length) return;

    const cashbacks = await this.cashBackBalanceRepository.find({
      where: {
        user_id: CashBackBalances[0]?.user_id,
      },
    });

    const toSave: CashBackBalance[] = [];
    const toUpdate: CashBackBalance[] = [];

    for (const cashbackBalance of CashBackBalances) {
      const cashback = cashbacks.find(
        (cb) => cb.rescue_id == cashbackBalance.rescue_id,
      );

      if (!cashback) {
        toSave.push(cashbackBalance);
      } else {
        cashback.balance =
          Number(cashback.balance) + Number(cashbackBalance.balance);
        toUpdate.push(cashback);
      }
    }
    await this.cashBackBalanceRepository.save(toSave);

    for (const update of toUpdate) {
      try {
        await this.cashBackBalanceRepository.update(update.id, {
          balance: update.balance,
          updated_at: new Date(),
        });
      } catch (error) {}
    }
  }
}
