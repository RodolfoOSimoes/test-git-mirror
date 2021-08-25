import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Statement } from '../../entities/statement.entity';

@Injectable()
export class StatementService {
  constructor(
    @Inject('STATEMENT_REPOSITORY')
    private statementRepository: Repository<Statement>,
  ) {}

  async findAll(page = 1) {
    const limit = 10;
    return await this.statementRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number) {
    return await this.statementRepository.findOne(id);
  }
}
