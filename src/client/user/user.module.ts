import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/providers/user.providers';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { AuthenticationService } from 'src/utils/authentication/authentication.service';
import { authenticationTokenProviders } from 'src/providers/authentication-token.providers';
import { StorageService } from 'src/utils/storage/storage.service';
import { activeStorageBlobProviders } from 'src/providers/active-storage-blob.providers';
import { activeStorageAttachmentProviders } from 'src/providers/active-storage-attachment.providers';
import { StorageModule } from 'src/utils/storage/storage.module';
import { questProviders } from 'src/providers/quest.providers';
import { settingsProviders } from 'src/providers/settings.providers';
import { orderProviders } from 'src/providers/order.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { accomplishedQuestProviders } from 'src/providers/accomplished-quest.providers';
import { extractProviders } from 'src/providers/extract.providers';
import { cityProviders } from 'src/providers/city.providers';
import { invitationProviders } from 'src/providers/invitation.providers';
import { campaignProviders } from 'src/providers/campaign.providers';
import { withdrawalProviders } from 'src/providers/withdrawal.providers';
import { DeezerService } from 'src/apis/deezer/deezer.service';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    ...authenticationTokenProviders,
    ...activeStorageBlobProviders,
    ...activeStorageAttachmentProviders,
    ...questProviders,
    ...settingsProviders,
    ...orderProviders,
    ...statementProviders,
    ...accomplishedQuestProviders,
    ...extractProviders,
    ...cityProviders,
    ...invitationProviders,
    ...campaignProviders,
    ...withdrawalProviders,
    DeezerService,
    UserService,
    PaginationService,
    AuthenticationService,
    StorageService,
  ],
  exports: [UserService],
})
export class UserModule {}
