import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { Statement } from '../../entities/statement.entity';

@Injectable()
export class StatementService {
  constructor(
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private paginationService: PaginationService,
  ) {}

  async findAll(user_id: number, page = 1) {
    const user = await this.userRepository.findOne(user_id);
    const limit = 10;
    const [result, count] = await this.statementRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where: { user: user },
      order: { id: 'DESC' },
    });

    const data = result.map((statment) => {
      if (!statment.kind) statment.amount = statment.amount * -1;
      return statment;
    });

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/users',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    return await this.statementRepository.findOne(id);
  }
}
