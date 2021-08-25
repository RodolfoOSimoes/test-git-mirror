import { Module } from '@nestjs/common';
import { BadgeChallengeService } from './badge-challenge.service';
import { BadgeChallengeController } from './badge-challenge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { badgeChallengeProviders } from '../../providers/badge-challenge.providers';
import { AdminModule } from '../admin/admin.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';

@Module({
  controllers: [BadgeChallengeController],
  imports: [DatabaseModule, AdminModule],
  providers: [
    ...badgeChallengeProviders,
    BadgeChallengeService,
    PaginationService,
  ],
  exports: [BadgeChallengeModule, BadgeChallengeService],
})
export class BadgeChallengeModule {}
