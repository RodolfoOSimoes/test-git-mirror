import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { AdminModule } from '../admin/admin.module';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { questProviders } from '../../providers/quest.providers';
import { questOptsProviders } from 'src/providers/quest-opts.providers';
import { questPreSavesProviders } from 'src/providers/quest-pre-saves.providers ';

@Module({
  controllers: [QuestController],
  providers: [
    ...questProviders,
    ...questOptsProviders,
    ...questPreSavesProviders,
    QuestService,
    PaginationService,
  ],
  imports: [DatabaseModule, AdminModule],
})
export class QuestModule {}
