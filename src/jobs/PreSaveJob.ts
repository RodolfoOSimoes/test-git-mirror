import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { StreamRecords } from 'src/entities/stream_records.entity';
import { User } from 'src/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class PreSaveJob {
  constructor(
    @Inject('STREAM_RECORDS_REPOSITORY')
    private repository: Repository<StreamRecords>,
    private spotifyService: SpotifyService,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCron() {
    console.log('presave job');
  }
}
