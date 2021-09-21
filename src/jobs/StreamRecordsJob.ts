import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Between, MoreThan, Repository } from 'typeorm';
import { UserStreamRecords } from 'src/entities/user_stream_records.entity';
import { StreamRecords } from 'src/entities/stream_records.entity';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { Rescue } from 'src/entities/rescue.entity';

@Injectable()
export class StreamRecordsJob {
  constructor(
    @Inject('USER_STREAM_RECORDS_REPOSITORY')
    private userStreamRepository: Repository<UserStreamRecords>,
    @Inject('STREAM_RECORDS_REPOSITORY')
    private streamRepository: Repository<StreamRecords>,
    @Inject('RECENTLY_PLAYEDS_REPOSITORY')
    private recentlyPlayedRepository: Repository<RecentlyPlayeds>,
    @Inject('RESCUE_REPOSITORY')
    private rescueRepository: Repository<Rescue>,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_DAY_AT_5AM)
  async handleCron() {
    const yesterday = this.getYesterday();
    const recently = await this.recentlyPlayedRepository.query(
      `
      SELECT COUNT(DISTINCT(user_id)) AS distinct_users FROM recently_playeds WHERE created_at BETWEEN ? AND ?`,
      [yesterday.start, yesterday.end],
    );
    console.log('start StreamRecordsJob');
    const userStream = await this.userStreamRepository.findOne({
      where: { date: yesterday.date },
    });
    if (
      !userStream &&
      recently &&
      recently[0] &&
      recently[0].distinct_users > 0
    ) {
      await this.userStreamRepository.save({
        date: yesterday.date,
        quantity: recently[0]?.distinct_users,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    const rescues = await this.rescueRepository.find({
      order: { priority: 'ASC', id: 'DESC' },
      where: { deleted: false, status: true },
    });
    let iteration = 0;
    while (true) {
      try {
        const streamRecords = await this.streamRepository.find({
          where: { date: yesterday.date },
        });
        const recentlyPlayeds = await this.recentlyPlayedRepository.find({
          take: 50,
          where: {
            created_at: Between(yesterday.start, yesterday.end),
            id: MoreThan(iteration),
          },
        });
        if (!recentlyPlayeds.length) {
          break;
        } else {
          iteration = recentlyPlayeds[recentlyPlayeds.length - 1].id;
        }
        for (const recently of recentlyPlayeds) {
          const items = recently['content']['items'];
          items?.map((item) => {
            const date_played = item.played_at.split('T')[0];
            if (date_played == yesterday.date) {
              const rescue = rescues.find(
                (rescue) => rescue.uri == item.track.uri,
              );
              if (rescue) {
                const stream = streamRecords.find(
                  (stream) =>
                    stream.track_uri == item.track.uri &&
                    (stream.playlist_uri == item.context?.uri ||
                      (!stream.playlist_uri && !item.context)),
                );
                if (stream) {
                  stream.stream_quantity++;
                } else {
                  const streamRecord = new StreamRecords();
                  streamRecord.artists_name = item.track.artists
                    .map((artist) => artist.name)
                    .join(', ');
                  streamRecord.playlist_uri = item.context?.uri;
                  streamRecord.stream_quantity = 1;
                  streamRecord.track_name = item.track.name;
                  streamRecord.track_uri = item.track.uri;
                  streamRecords.push(streamRecord);
                }
              }
            }
          });
        }
        for (const stream of streamRecords) {
          if (stream.id) {
            await this.streamRepository.update(stream.id, {
              stream_quantity: stream.stream_quantity,
              updated_at: new Date(),
            });
          } else {
            await this.streamRepository.save({
              artists_name: stream.artists_name,
              date: yesterday.date,
              playlist_uri: stream.playlist_uri,
              stream_quantity: stream.stream_quantity,
              track_name: stream.track_name,
              track_uri: stream.track_uri,
              created_at: new Date(),
              updated_at: new Date(),
            });
          }
        }
      } catch (error) {
        console.log(`StreamRecordsJob:: ${error.message}`);
      }
    }
    console.log('finish StreamRecordsJob');
  }

  getYesterday() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    const year = date.getFullYear();
    const formatedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return {
      start: `${formatedDate} 00:00:00`,
      end: `${formatedDate} 23:59:59`,
      date: formatedDate,
    };
  }
}
