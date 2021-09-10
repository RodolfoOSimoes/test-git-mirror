import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import { Statement } from 'src/entities/statement.entity';
import { Withdrawal } from 'src/entities/withdrawals.entity';
import { generateBalance } from 'src/utils/balance.utils';
import { prepareDate } from 'src/utils/date.utils';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('WITHDRAWAL_REPOSITORY')
    private withdrawRepository: Repository<Withdrawal>,
    private paginationService: PaginationService,
  ) {}

  async findAll(page = 1, size = 10, query: string) {
    const [data, count] = await this.userRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      relations: ['city'],
      order: { id: 'DESC' },
      where: query
        ? [{ name: ILike(`%${query}%`) }, { email: ILike(`%${query}%`) }]
        : {},
    });

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / size),
      links: this.paginationService.pagination(
        'v1/backoffice/users',
        page,
        size,
        count,
      ),
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    const address = await this.addressRepository.findOne({
      where: { user: user },
      order: { id: 'DESC' },
      relations: ['city', 'city.state', 'city.state.region'],
    });

    delete user.credentials;

    user.withdrawals = await this.withdrawRepository.find({
      where: {
        user: user,
        date_spent: MoreThanOrEqual(moment(new Date()).format('YYYY-MM-DD')),
      },
    });

    user.statements = await this.statementRepository.find({
      where: {
        user: user,
        kind: 1,
        expiration_date: MoreThanOrEqual(prepareDate()),
      },
    });

    const total_balance =
      generateBalance(user.statements, user.withdrawals) || 0;

    delete user.withdrawals;
    delete user.statements;

    return {
      ...user,
      situation: user.situation ? 'banned' : 'active',
      address,
      total_balance,
    };
  }

  async findById(id: number) {
    return await this.userRepository.findOne(id);
  }

  userMapper(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city?.name || undefined,
      balance: user.balance,
      opt_in_mailing: user.opt_in_mailing,
      have_accepted: user.have_accepted,
      situation: user.situation ? 'banned' : 'active',
    };
  }
}
