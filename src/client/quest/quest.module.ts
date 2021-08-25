import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { DatabaseModule } from 'src/database/database.module';
import { questProviders } from 'src/providers/quest.providers';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { userProviders } from 'src/providers/user.providers';
import { userQuestSpotifyPlaylistsProviders } from 'src/providers/user-quest-spotify-playlists.providers';
import { accomplishedQuestProviders } from 'src/providers/accomplished-quest.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { campaignProviders } from 'src/providers/campaign.providers';
import { preSaveUsersProviders } from 'src/providers/pre-save-user.providers';
import { questSpotifiesProviders } from 'src/providers/quest-spotifies.providers';
import { questSpotifyPlaylistsProviders } from 'src/providers/quest-spotify-playlists.providers';
import { questQuestionsProviders } from 'src/providers/quest-questions.providers';
import { questPreSavesProviders } from 'src/providers/quest-pre-saves.providers ';

@Module({
  imports: [DatabaseModule],
  controllers: [QuestController],
  providers: [
    ...questProviders,
    ...userProviders,
    ...userQuestSpotifyPlaylistsProviders,
    ...questSpotifyPlaylistsProviders,
    ...accomplishedQuestProviders,
    ...questSpotifiesProviders,
    ...questQuestionsProviders,
    ...statementProviders,
    ...campaignProviders,
    ...preSaveUsersProviders,
    ...questPreSavesProviders,
    QuestService,
    PaginationService,
  ],
})
export class QuestModule {}
