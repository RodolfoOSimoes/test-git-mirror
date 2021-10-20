import { Inject, Injectable } from '@nestjs/common';
import { CashBackBalance } from 'src/entities/cash-backs-balance.entity';
import { CashBack } from 'src/entities/cash-backs.entity';
import { Rescue } from 'src/entities/rescue.entity';
import { User } from 'src/entities/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class CashBackService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('CASH_BACK_REPOSITORY')
    private cashBackRepository: Repository<CashBack>,
    @Inject('RESCUE_REPOSITORY')
    private rescueRepository: Repository<Rescue>,
    @Inject('CASH_BACK_BALANCE_REPOSITORY')
    private cashBackBalanceRepository: Repository<CashBackBalance>,
  ) {}

  async findAll(userId: number) {
    const user = await this.userRepository.findOne(userId);

    user.cashbacks = await this.cashBackRepository.query(
      `SELECT * FROM cash_backs WHERE user_id = ? AND played_at >= ? ORDER BY track_id DESC
      `,
      [userId,moment().format("YYYY-MM-DD")],
    );

    const filteredCashback = await this.cashBackBalanceRepository.find({
      where: { user: user}
    });

    const rescues = await this.rescueRepository.find({
      order: { priority: 'ASC', id: 'DESC' },
      where: { deleted: false, status: true },
    });

    const data = rescues.map((rescue) => {
      const { balance, limited } = this.getBalance(rescue, user.cashbacks, filteredCashback);

      return {
        id: rescue.id,
        type: 'cash_backs',
        artists: rescue.artists,
        balance: balance,
        cover_url: rescue.cover_url,
        info_playlist: rescue.info_playlist,
        limit_streams: rescue.limit_streams,
        limited: limited,
        name: rescue.name,
        score: rescue.score,
        uid: rescue.uid,
        uri: rescue.uri,
        playlist: rescue.playlist,
      };
    });

    return data;
  }

  async findOne(id: number) {
    return this.cashBackRepository.findOne(id);
  }

  getBalance(
    rescue: Rescue,
    cashbacks: CashBack[],
    filteredCashback: CashBackBalance[],
  ): { balance: number; limited: number } {
    const todayCashbacksFiltered = cashbacks.filter(
      (cashback) => cashback.track_id == rescue.uid,
    );

    const todayBalance = todayCashbacksFiltered.length * rescue.score;
    const priorPoints = filteredCashback.find(cashback => cashback.rescue_id == rescue.id)

    return {
      balance:
        Number(todayBalance) + Number(priorPoints?.balance || 0),
      limited:
        todayCashbacksFiltered?.filter(
          (cashback) =>
            moment(new Date()).utcOffset('-0300').format('YYYY-MM-DD') ==
            moment(cashback.played_at).format('YYYY-MM-DD'),
        )?.length || 0,
    };
  }

  compareDate(date: Date): boolean {
    const date1 = moment(date).format('YYYY-MM-DD');
    const date2 = moment(new Date()).format('YYYY-MM-DD');
    return date1 == date2;
  }
}
