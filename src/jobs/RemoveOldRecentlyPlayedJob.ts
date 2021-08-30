import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { User } from 'src/entities/user.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class RemoveOldRecentlyPlayedJob {
  constructor(
    @Inject('RECENTLY_PLAYEDS_REPOSITORY')
    private recentlyPlayedRepository: Repository<RecentlyPlayeds>,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    try {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(RecentlyPlayeds)
        .where('created_at < :created_at LIMIT 200', {
          created_at: this.getDate(),
        })
        .execute();
    } catch (error) {}
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
