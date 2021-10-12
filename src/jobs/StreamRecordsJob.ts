import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Between, MoreThan, Repository } from 'typeorm';
import { UserStreamRecords } from 'src/entities/user_stream_records.entity';
import { StreamRecords } from 'src/entities/stream_records.entity';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';
import { Rescue } from 'src/entities/rescue.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');
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
          for (const item of items) {
            const rescue = rescues.find(
              (rescue) => rescue.uri == item.track.uri,
            );
            if (rescue) {
              const date_played = item.played_at.split('T')[0];
              if (date_played == yesterday.date) {
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
                  streamRecord.date = date_played;
                  streamRecords.push(streamRecord);
                }
              } else {
                let stream = streamRecords.find(
                  (stream) =>
                    stream.track_uri == item.track.uri &&
                    stream.date == date_played &&
                    (stream.playlist_uri == item.context?.uri ||
                      (!stream.playlist_uri && !item.context)),
                );
                if (!stream) {
                  stream = await this.streamRepository.findOne({
                    where: {
                      playlist_uri: item.context?.uri,
                      date: date_played,
                      track_uri: item.track.uri,
                    },
                  });
                  if (stream) streamRecords.push(stream);
                }
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
                  streamRecord.date = date_played;
                  streamRecords.push(streamRecord);
                }
              }
            }
          }
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
              date: stream.date,
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
    await this.summarizeRecords();
    console.log('finish StreamRecordsJob');
  }

  async summarizeRecords() {
    console.log('Start summary');

    const date = moment(new Date())
      .utcOffset('-0300')
      .subtract(2, 'day')
      .format('YYYY-MM-DD');
    console.log(date);

    const distinctTracks = await this.getDistinctTracks(date);

    for (const track of distinctTracks) {
      const [result] = await this.getTopOffset(date, track.uri);
      const offset = result.count >= 10 ? 10 : Number(result.count) || 0;
      await this.summarizeOthers(date, track.uri, offset);
    }

    console.log('Finish summary');
  }

  async getDistinctTracks(date: string) {
    return await this.streamRepository.query(
      `
      SELECT DISTINCT(track_uri) as uri FROM stream_records WHERE date = ?
    `,
      [date],
    );
  }

  async getTopOffset(date: string, track_uri: string) {
    return await this.streamRepository.query(
      `
      SELECT count(*) AS count FROM stream_records sr WHERE date = ? AND 
      track_uri = ? AND 
      stream_quantity >= 10 ORDER BY stream_quantity DESC 
    `,
      [date, track_uri],
    );
  }

  async summarizeOthers(date: string, track_uri: string, offset: number) {
    const records = await this.streamRepository.query(
      `
      SELECT * FROM stream_records WHERE date = ? AND 
      track_uri = ? 
      ORDER BY stream_quantity DESC 
      LIMIT 1000 offset ?
    `,
      [date, track_uri, offset],
    );

    const quantity = records.reduce(
      (acc, record) => acc + record.stream_quantity,
      0,
    );

    const ids = records.map((record) => record.id);
    if (ids && ids.length) {
      await this.removeRecords(ids);
      await this.saveOther(date, track_uri, quantity, records[0]);
    }

    return quantity;
  }

  async removeRecords(ids) {
    return await this.streamRepository.query(
      `
      DELETE FROM stream_records WHERE id IN (?)
    `,
      [ids],
    );
  }

  async saveOther(date, track_uri, quantity, record) {
    if (!record) return;
    return await this.streamRepository.save({
      artists_name: record.artists_name,
      date: date,
      track_name: record.track_name,
      playlist_uri: 'others',
      stream_quantity: quantity,
      track_uri: track_uri,
      created_at: new Date(),
      updated_at: new Date(),
    });
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
      date: moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
    };
  }
}
