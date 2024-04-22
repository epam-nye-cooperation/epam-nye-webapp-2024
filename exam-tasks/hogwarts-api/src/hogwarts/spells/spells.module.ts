import { Module } from '@nestjs/common';
import { SpellsController } from './spells.controller';
import { SpellService } from './spells.service';

@Module({
  controllers: [SpellsController],
  imports: [],
  providers: [SpellService],
  exports: [SpellService],
})
export class SpellsModule {}
