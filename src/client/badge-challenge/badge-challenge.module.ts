import { Module } from '@nestjs/common';
import { BadgeChallengeService } from './badge-challenge.service';
import { BadgeChallengeController } from './badge-challenge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { badgeChallengeProviders } from 'src/providers/badge-challenge.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BadgeChallengeController],
  providers: [...badgeChallengeProviders, BadgeChallengeService],
})
export class BadgeChallengeModule {}
