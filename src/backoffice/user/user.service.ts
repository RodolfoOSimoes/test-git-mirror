import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { ILike, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
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
    const user = await this.userRepository.findOne(id, {
      relations: ['city', 'city.state', 'city.state.region'],
    });

    const address = await this.addressRepository.findOne({
      where: { user: user },
      order: { id: 'DESC' },
    });

    delete user.credentials;

    return {
      ...user,
      situation: user.situation ? 'banned' : 'active',
      address,
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
