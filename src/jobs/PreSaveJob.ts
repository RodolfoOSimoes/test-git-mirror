import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { User } from 'src/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class PreSaveJob {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private spotifyService: SpotifyService,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    // const stream_records = await this.userRepository.query(
    //   `
    //   SELECT * FROM stream_records WHERE date = ? ORDER BY date DESC, track_uri, stream_quantity DESC
    // `,
    //   ['2021-09-24'],
    // );
    // const groupByTrackUri = this.groupBy('track_uri');
    // const groups = groupByTrackUri(stream_records);
    // const streamRecords = [];
    // for (const track in groups) {
    //   streamRecords.push({
    //     a: groups[track][0],
    //   });
    //   for (let i = 0; i < groups[track].length; i++) {
    //     console.log('    ' + groups[track][i].color);
    //   }
    // }
  }

  groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  async loadUsers(id: number) {
    return await this.userRepository.find({
      take: 10,
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
        id: MoreThan(id),
      },
      select: ['id', 'credentials', 'product'],
    });
  }
}
