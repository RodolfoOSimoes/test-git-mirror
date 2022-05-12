import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { PreSaveUser } from 'src/entities/pre-save-users.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { getIdElementFromUri } from 'src/utils/deezer.utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class PreSaveJob {
  constructor(
    @Inject('PRE_SAVE_USER_REPOSITORY')
    private repository: Repository<PreSaveUser>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private spotifyService: SpotifyService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleCron() {
    const presaveUsers = await this.loadUserPreSaves();
    for (const presave of presaveUsers) {
      try {
        const user = await this.userRepository.findOne({
          where: { id: presave.user_id },
          select: ['credentials'],
        });
        const accessToken = user.credentials['token'];
        const trackId = getIdElementFromUri(presave.uri);
        if (trackId) {
          await this.spotifyService.saveTrack(accessToken, trackId);
          await this.repository.update(presave.id, {
            saved: true,
            updated_at: new Date(),
          });
        }
      } catch (error) {}
    }
  }

  async loadUserPreSaves() {
    return await this.repository.query(`
    SELECT psu.*, qps.uri FROM pre_save_users psu INNER JOIN quest_pre_saves qps 
    ON psu.quest_pre_save_id = qps.id 
    WHERE qps.launch_in >= '2021-01-01' AND psu.saved = 0
  `);
  }
}
