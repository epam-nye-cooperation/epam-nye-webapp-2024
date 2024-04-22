import { Module } from '@nestjs/common';
import { SortingHatController } from './sorting-hat.controller';
import { SortingHatService } from './sorting-hat.service';
import { HousesModule } from '../houses/houses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SortingHatController],
  imports: [HousesModule, UsersModule],
  providers: [SortingHatService],
  exports: [SortingHatService],
})
export class SortingHatModule {}
