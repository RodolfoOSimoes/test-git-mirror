import { Inject, Injectable } from '@nestjs/common';
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
  ) {}

  async findAll(userId: number) {
    const user = await this.userRepository.findOne(userId);

    user.cashbacks = await this.cashBackRepository.query(
      `SELECT * FROM cash_backs WHERE user_id = ? ORDER BY track_id DESC
      `,
      [userId],
    );

    const rescues = await this.rescueRepository.find({
      order: { priority: 'ASC', id: 'DESC' },
      where: { deleted: false, status: true },
    });

    const data = rescues.map((rescue) => {
      const { balance, limited } = this.getBalance(rescue, user.cashbacks);

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
  ): { balance: number; limited: number } {
    const cashbacksFiltered = cashbacks.filter(
      (cashback) => cashback.track_id == rescue.uid,
    );

    return {
      balance:
        cashbacksFiltered?.reduce((total, current) => {
          if (current.track_id == rescue.uid) {
            return total + rescue.score;
          }
        }, 0) || 0,
      limited:
        cashbacksFiltered?.filter(
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
