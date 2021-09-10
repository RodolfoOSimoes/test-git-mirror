import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from '../../providers/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { SpotifyService } from 'src/apis/spotify/spotify.service';
import { addressProviders } from 'src/providers/address.providers';
import { statementProviders } from 'src/providers/statement.providers';
import { withdrawalProviders } from 'src/providers/withdrawal.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    ...addressProviders,
    ...statementProviders,
    ...withdrawalProviders,
    UserService,
    PaginationService,
    SpotifyService,
  ],
  exports: [UserModule, UserService],
})
export class UserModule {}
