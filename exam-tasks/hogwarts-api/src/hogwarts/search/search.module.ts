import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SpellsModule } from '../spells/spells.module';
import { PotionsModule } from '../potions/potions.module';

@Module({
  controllers: [SearchController],
  imports: [SpellsModule, PotionsModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
