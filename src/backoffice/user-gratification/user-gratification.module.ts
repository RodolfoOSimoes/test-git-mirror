import { Module } from '@nestjs/common';
import { UserGratificationService } from './user-gratification.service';
import { UserGratificationController } from './user-gratification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';

import { userGratificationProviders } from '../../providers/user-gratification.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { campaignProviders } from 'src/providers/campaign.providers';

@Module({
  controllers: [UserGratificationController],
  imports: [AdminModule, UserModule, DatabaseModule],
  providers: [
    ...userGratificationProviders,
    ...statementProviders,
    ...campaignProviders,
    UserGratificationService,
  ],
})
export class UserGratificationModule {}
