import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AdminModule } from '../admin/admin.module';
import { DatabaseModule } from 'src/database/database.module';
import { commentProviders } from '../../providers/comment.providers';

@Module({
  controllers: [CommentController],
  providers: [...commentProviders, CommentService],
  imports: [DatabaseModule, AdminModule],
})
export class CommentModule {}
