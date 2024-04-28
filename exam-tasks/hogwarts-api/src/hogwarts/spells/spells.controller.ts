import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Spell, SpellIdRequest, SpellSearchParams } from './spells.type';
import { SpellService } from './spells.service';
import { SearchResults } from '../search/search.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Spells')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('spells')
export class SpellsController {

  constructor(private spells: SpellService) {}

  @ApiOperation({ operationId: 'searchSpell', summary: 'Varázslat keresése', description: 'Keresés a varázslatok között név, kategória, vagy fény szín alapján' })
  @ApiOkResponse({ type: SearchResults, description: 'Találatok' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @Get()
  searchSpell(@Query() params: SpellSearchParams): SearchResults {
    return this.spells.search(params);
  }

  @ApiOperation({ operationId: 'getSpell', summary: 'Varázslat adatai', description: 'Az adott varázslat részletes adatai' })
  @ApiOkResponse({ type: Spell, description: 'Varázslat' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiNotFoundResponse({ description: 'A keresett varázslat nem található' })
  @Get('/:spellId')
  getSpellById(@Param() { spellId }: SpellIdRequest) {
    const spell = this.spells.getById(spellId);
    if (!spell) {
      throw new NotFoundException('A varázslat nem található')
    }
    return spell;
  }
}
