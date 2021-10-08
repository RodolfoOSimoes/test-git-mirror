import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { Statement } from 'src/entities/statement.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
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
    private cashBackBalanceRepository: Repository<Rescue>,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    // const user = await this.userRepository.findOne(101015);
    // const statementsCount = await this.statementRepository.count({
    //   where: { user: user },
    // });
    // console.log('statementsCount');
  }
}
