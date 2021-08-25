import { Module } from '@nestjs/common';
import { UserGratificationService } from './user-gratification.service';
import { UserGratificationController } from './user-gratification.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';

import { userGratificationProviders } from '../../providers/user-gratification.providers';

@Module({
  controllers: [UserGratificationController],
  imports: [AdminModule, UserModule, DatabaseModule],
  providers: [...userGratificationProviders, UserGratificationService],
})
export class UserGratificationModule {}
