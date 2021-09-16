import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Between, MoreThan, Repository } from 'typeorm';
import { UserStreamRecords } from 'src/entities/user_stream_records.entity';
import { StreamRecords } from 'src/entities/stream_records.entity';
import { RecentlyPlayeds } from 'src/entities/recently-playeds.entity';

@Injectable()
export class StreamRecordsJob {
  constructor(
    @Inject('USER_STREAM_RECORDS_REPOSITORY')
    private userStreamRepository: Repository<UserStreamRecords>,
    @Inject('STREAM_RECORDS_REPOSITORY')
    private streamRepository: Repository<StreamRecords>,
    @Inject('RECENTLY_PLAYEDS_REPOSITORY')
    private recentlyPlayedRepository: Repository<RecentlyPlayeds>,
  ) {}

  // @Cron('30 * * * * *')
  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const yerterday = this.getYesterday();

    // const recently = await this.recentlyPlayedRepository.f

    // let iteration = 0;

    // while (iteration != -1) {
    //   const users = await this.loadUsers(iteration);
    //   if (!users.length) {
    //     iteration = -1;
    //   } else {
    //     iteration = users[users.length - 1].id;
    //   }

    //   users.forEach(async (user) => {
    //     const extract = await this.extractRepository.findOne({
    //       where: { user: user },
    //       order: { created_at: 'DESC' },
    //       select: ['created_at'],
    //     });

    //     if (!this.hasTodayExtract(extract?.created_at)) {
    //       const depositsStatements = await this.statementRepository.find({
    //         where: {
    //           user: user,
    //           created_at: Between(yerterday.start, yerterday.end),
    //         },
    //       });

    //       const expiredStatements = await this.statementRepository.find({
    //         where: {
    //           user: user,
    //           expiration_date: yerterday.expiration,
    //           kind: 1,
    //         },
    //       });

    //       const expired =
    //         expiredStatements.reduce(
    //           (acc, statement) => acc + Number(statement.amount),
    //           0,
    //         ) || 0;

    //       const deposited =
    //         depositsStatements.reduce((acc, statement) => {
    //           if (statement.kind == 1) return acc + Number(statement.amount);
    //         }, 0) || 0;

    //       const withdraw =
    //         depositsStatements.reduce((acc, statement) => {
    //           if (statement.kind == 0) return acc + Number(statement.amount);
    //         }, 0) || 0;

    //       await this.extractRepository.save({
    //         created_at: new Date(),
    //         updated_at: new Date(),
    //         user: user,
    //         date_day: yerterday.expiration,
    //         deposit: deposited,
    //         expired: expired,
    //         withdrawals: withdraw,
    //       });
    //     }
    //   });
    // }
  }

  getYesterday() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate() - 1;
    const year = date.getFullYear();
    const formatedData = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return {
      start: `${formatedData} 00:00:00`,
      end: `${formatedData} 23:59:59`,
    };
  }
}
