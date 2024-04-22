import { Module } from '@nestjs/common';
import { PotionsController } from './potions.controller';
import { PotionService } from './potions.service';

@Module({
  controllers: [PotionsController],
  imports: [],
  providers: [PotionService],
  exports: [PotionService],
})
export class PotionsModule {}
