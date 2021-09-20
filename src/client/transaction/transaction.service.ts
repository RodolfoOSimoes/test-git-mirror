import { Inject, Injectable } from '@nestjs/common';
import { Extract } from 'src/entities/extract.entity';
import { User } from 'src/entities/user.entity';
import { formatDate } from 'src/utils/date.utils';
import { MoreThan, Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class TransactionService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('EXTRACT_REPOSITORY')
    private extractRepository: Repository<Extract>,
  ) {}
  async findAll(id: number) {
    const user = await this.userRepository.findOne(id, {
      order: { id: 'DESC' },
    });

    const extracts = await this.extractRepository.find({
      where: {
        user: user,
      },
      order: { id: 'DESC' },
    });

    const data = extracts.map((extract) => {
      if (extract.withdrawal > 0 || extract.expired > 0 || extract.deposit > 0)
        return {
          id: extract.id,
          type: 'transactions',
          created_at: formatDate(extract.created_at),
          deposit: extract.deposit,
          expiration_date: this.formatExpireDate(extract.date_day),
          exired: extract.expired,
          withdrawal: extract.withdrawal,
        };
    });

    return data;
  }

  formatExpireDate(dateGenerated: Date) {
    return moment(dateGenerated).add(90, 'days').format('YYYY-MM-DD');
  }
}
