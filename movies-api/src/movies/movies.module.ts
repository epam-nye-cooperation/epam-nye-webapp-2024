import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MovieService } from './movies.service';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [MoviesController],
  imports: [AuthModule, ConfigModule],
  exports: [MovieService],
  providers: [MovieService],
})
export class MoviesModule {}
