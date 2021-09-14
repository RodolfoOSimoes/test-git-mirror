import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { formatDate } from 'src/utils/date.utils';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async findAll(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['extracts'],
      order: { id: 'ASC' },
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

  formatExpireDate(created_at: Date) {
    const date = new Date(
      new Date(created_at).setDate(new Date().getDate() + 90),
    );

    return formatDate(date);
  }
}
