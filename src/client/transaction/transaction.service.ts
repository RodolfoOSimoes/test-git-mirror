import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { formatDate } from 'src/utils/date.utils';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class TransactionService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async findAll(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['extracts'],
      order: { id: 'DESC' },
    });

    const data = user.extracts.map((extract) => {
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
