import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CommentController } from './comment.controller';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

@Module({
  controllers: [ForumController, CommentController],
  imports: [AuthModule, ConfigModule, UsersModule],
  exports: [ForumService],
  providers: [ForumService],
})
export class ForumModule {}
