import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpotifyProductJob {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private spotifyService: SpotifyService,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async handleCron() {
    const users = await this.loadUsers();

    users.forEach(async (user) => {
      try {
        const result = await this.spotifyService.getuser(
          user.credentials['refresh_token'],
        );

        if (result && result.product) {
          await this.userRepository.update(user.id, {
            product: result.product,
            updated_at: new Date(),
            last_time_checked_product: new Date(),
          });
        }
      } catch (error) {
        console.log(`user_id: ${user.id} - error:: ${error.message}`);
      }
    });
  }

  async loadUsers() {
    return await this.userRepository.find({
      where: {
        deleted: false,
        situation: false,
        have_accepted: true,
      },
      select: ['id', 'credentials', 'product'],
    });
  }
}
