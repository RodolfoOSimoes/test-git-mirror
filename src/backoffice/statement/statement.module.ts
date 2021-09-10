import { Module } from '@nestjs/common';
import { StatementService } from './statement.service';
import { StatementController } from './statement.controller';
import { DatabaseModule } from 'src/database/database.module';
import { statementProviders } from '../../providers/statement.providers';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { userProviders } from 'src/providers/user.providers';

@Module({
  controllers: [StatementController],
  imports: [DatabaseModule],
  providers: [
    ...statementProviders,
    ...userProviders,
    StatementService,
    PaginationService,
  ],
})
export class StatementModule {}
