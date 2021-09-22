import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // static enable = true;
  // constructor(
  //   @Inject('EXTRACT_REPOSITORY')
  //   private extractRepository: Repository<Extract>,
  //   @Inject('STATEMENT_REPOSITORY')
  //   private statementRepository: Repository<Statement>,
  // ) {}
  // async handleCron() {
  //   let iteration = 3448479;
  //   console.log('start');
  //   if (process.env.ENABLE_EXTRACT == 'true' && AppService.enable) {
  //     console.log('process');
  //     AppService.enable = false;
  //     while (true) {
  //       const extracts = await this.loadExtracts(iteration);
  //       if (!extracts.length) {
  //         break;
  //       } else {
  //         iteration = extracts[extracts.length - 1].id;
  //       }
  //       console.log(`id: ${iteration} - data: ${new Date()}`);
  //       await Promise.all([
  //         this.updateExtrats(extracts.splice(0, 10)),
  //         this.updateExtrats(extracts.splice(0, 10)),
  //         this.updateExtrats(extracts.splice(0, 10)),
  //         this.updateExtrats(extracts.splice(0, 10)),
  //         this.updateExtrats(extracts.splice(0, 10)),
  //       ]);
  //       console.log('finished extract');
  //     }
  //   }
  // }
  // async loadExtracts(id: number) {
  //   return await this.extractRepository.find({
  //     where: {
  //       date_day: '2021-09-20',
  //       id: MoreThan(id),
  //     },
  //     order: { id: 'ASC' },
  //     take: 50,
  //   });
  // }
  // async updateExtrats(extracts) {
  //   for (const extract of extracts) {
  //     try {
  //       const [deposit] = await this.statementRepository.query(
  //         `
  //         SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
  //       `,
  //         ['2021-09-20', extract.user_id, 1],
  //       );
  //       const [withdraw] = await this.statementRepository.query(
  //         `
  //         SELECT SUM(amount) AS amount FROM statements WHERE DATE(CONVERT_TZ(created_at, 'UTC', 'America/Sao_Paulo')) = ? AND user_id = ? AND kind = ?
  //       `,
  //         ['2021-09-20', extract.user_id, 0],
  //       );
  //       const [expired] = await this.statementRepository.query(
  //         `
  //         SELECT SUM(amount) AS amount FROM statements WHERE expiration_date = ? AND user_id = ? AND kind = ?
  //       `,
  //         ['2021-09-20', extract.user_id, 1],
  //       );
  //       const query = `UPDATE extracts SET deposit = ${extract.deposit}, withdrawal = ${extract.withdrawal}, expired = ${extract.expired} WHERE id = ${extract.id}  -- user_id: ${extract.user_id}\n`;
  //       fs.appendFile('extract.sql', `${query}`, function (err) {
  //         if (err) throw err;
  //       });
  //       await this.extractRepository.update(extract.id, {
  //         updated_at: new Date(),
  //         deposit: deposit.amount || 0,
  //         expired: expired.amount || 0,
  //         withdrawal: withdraw.amount || 0,
  //       });
  //     } catch (error) {
  //       console.log('ExtractJob::Error::', error.message);
  //     }
  //   }
  // }
}
