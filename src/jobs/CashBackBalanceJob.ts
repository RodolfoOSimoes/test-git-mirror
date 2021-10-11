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

  @Cron('46 15 * * *')
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.log('start');
    console.time('cashback balance');
    const users = await this.userRepository.find({
      where: {
        id: In([7846, 2871, 815, 3340, 1804, 545, 1975, 9801, 2766, 9557]),
      },
    });

    for (const user of users) {
      const statements = await this.statementRepository.find({
        where: {
          user: user,
          statementable_type: 'CashBack',
        },
        select: ['amount', 'statementable_id', 'created_at'],
      });

      for (const statement of statements) {
        if (
          statement.statementable_id < 1400 &&
          this.isAfter(statement.created_at)
        ) {
          await this.saveOrUpdateCashBackBalance(
            user.id,
            statement.statementable_id,
            statement.amount,
          );
        } else {
          const cashBack = await this.cashBackRepository.findOne({
            where: { user: user, id: statement.statementable_id },
          });

          const id = cashBack ? cashBack.rescue_id : statement.statementable_id;
          await this.saveOrUpdateCashBackBalance(user.id, id, statement.amount);
        }
      }
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

  isAfter(date) {
    return moment('2021-09-01').isAfter(moment(date));
  }
}
