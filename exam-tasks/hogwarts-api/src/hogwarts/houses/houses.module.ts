import { Module } from '@nestjs/common';
import { HouseController } from './houses.controller';
import { HouseService } from './houses.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [HouseController],
  imports: [UsersModule],
  providers: [HouseService],
  exports: [HouseService],
})
export class HousesModule {}
