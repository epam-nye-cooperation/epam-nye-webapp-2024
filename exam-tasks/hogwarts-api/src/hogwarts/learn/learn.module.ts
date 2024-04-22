import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { PotionsModule } from '../potions/potions.module';
import { SpellsModule } from '../spells/spells.module';
import { LearningController } from './learning.controller';
import { LearnService } from './learn.service';
import { HousesModule } from '../houses/houses.module';

@Module({
  controllers: [LearningController],
  imports: [SpellsModule, PotionsModule, UsersModule, HousesModule],
  providers: [LearnService],
  exports: [LearnService],
})
export class LearnModule {}
