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

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    try {
      // await this.recentlyRepository.query(
      //   `DELETE FROM recently_playeds WHERE created_at <= ? LIMIT 200`,
      //   [this.getDate()],
      // );
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
    } 23:59:59`;

    return formatedData;
  }
}
