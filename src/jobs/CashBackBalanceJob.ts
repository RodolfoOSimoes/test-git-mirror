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

  @Cron('26 21 * * *')
  // @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('start');
    console.time('cashback balance');
    const users = await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
      },
      select: ['id'],
    });

    for (const user of users) {
      console.log(user.id);
      const statements = await this.statementRepository.query(
        `
      SELECT s.id, s.amount, s.statementable_id, s.created_at, cb.rescue_id, cb.user_id FROM statements s 
      INNER JOIN cash_backs cb ON cb.id = s.statementable_id 
      WHERE s.user_id = ? AND s.statementable_type = 'CashBack' AND s.created_at < '2021-10-11 03:00:00'
      `,
        [user.id],
      );

      const cashBackBalances: CashBackBalance[] = [];

      for (const statement of statements) {
        try {
          let id = statement.statementable_id;
          if (
            (statement.statementable_id > 1400 &&
              !this.isAfter(statement.created_at)) ||
            user.id == statement.user_id
          ) {
            id = statement.rescue_id;
          }

          const cashbackBalance = cashBackBalances.find(
            (cashbackBalance) =>
              cashbackBalance.rescue_id == id &&
              cashbackBalance.user_id == user.id,
          );

          if (cashbackBalance) {
            cashbackBalance.balance += Number(statement.amount);
            cashbackBalance.updated_at = new Date();
          } else {
            const newCashbackBalance = new CashBackBalance();
            newCashbackBalance.balance = Number(statement.amount);
            newCashbackBalance.rescue_id = id;
            newCashbackBalance.user_id = user.id;
            newCashbackBalance.created_at = new Date();
            newCashbackBalance.updated_at = new Date();
            cashBackBalances.push(newCashbackBalance);
          }
        } catch (error) {
          console.log(statement);
          console.log(error.message);
        }
      }

      // await this.saveOrUpdateCashBackBalance(user.id, id, statement.amount);
      await this.saveOrUpdateCashBackBalance2(cashBackBalances);
    }

    console.log('end');
    console.timeEnd('cashback balance');
  }

  async selectCashBackBalance(user_id, rescue_id) {
    return await this.cashBackBalanceRepository.findOne({
      where: { rescue_id: rescue_id, user_id: user_id },
    });
  }

  async saveOrUpdateCashBackBalance(user_id, rescue_id, amount) {
    const cashbackBalance = await this.selectCashBackBalance(
      user_id,
      rescue_id,
    );

    if (!cashbackBalance) {
      await this.cashBackBalanceRepository.save({
        created_at: new Date(),
        updated_at: new Date(),
        rescue_id: rescue_id,
        user_id: user_id,
        balance: amount,
      });
    } else {
      await this.cashBackBalanceRepository.update(cashbackBalance.id, {
        updated_at: new Date(),
        balance: Number(cashbackBalance.balance) + Number(amount),
      });
    }
  }

  async saveOrUpdateCashBackBalance2(CashBackBalances: CashBackBalance[]) {
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
      await this.cashBackBalanceRepository.update(update.id, {
        balance: update.balance,
        updated_at: new Date(),
      });
    }
  }

  isAfter(date) {
    return moment('2021-09-01').isAfter(moment(date));
  }
}
