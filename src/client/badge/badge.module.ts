import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/providers/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BadgeController],
  providers: [...userProviders, BadgeService],
})
export class BadgeModule {}
