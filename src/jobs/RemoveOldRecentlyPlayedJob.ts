import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class RemoveOldRecentlyPlayedJob {
  constructor(
    @Inject('RECENTLY_PLAYEDS_REPOSITORY')
    private recentlyRepository: Repository<RecentlyPlayeds>,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    try {
      // const date = this.getDate();
      // const [result] = await this.recentlyRepository.query(
      //   `SELECT COUNT(*) AS count FROM recently_playeds WHERE created_at < ?`,
      //   [date],
      // );
      // if (result && result.count > 300) {
      //   await this.recentlyRepository.query(
      //     `DELETE FROM recently_playeds WHERE created_at < ? LIMIT 200`,
      //     [date],
      //   );
      // }
    } catch (error) {
      console.log(error.message);
    }
  }

  getDate(): string {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 3;
    const year = date.getFullYear();
    const formatedData = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    } 23:59:30`;

    return formatedData;
  }
}
