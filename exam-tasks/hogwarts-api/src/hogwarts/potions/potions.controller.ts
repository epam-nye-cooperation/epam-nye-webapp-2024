import { Controller, Get, NotFoundException, Param, Query, UseGuards } from '@nestjs/common';
import { PotionService } from './potions.service';
import { Potion, PotionIdRequest, PotionSearchParams } from './potions.type';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SearchResults } from '../search/search.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth('bearer')
@ApiTags('Potions')
@UseGuards(JwtAuthGuard)
@Controller('/potions')
export class PotionsController {

  constructor(private potions: PotionService) {}

  @ApiOperation({ operationId: 'searchPotion', summary: 'Bájitalok keresése', description: 'Keresés a bájitalok között név, leírás, összetevők és nehézségi szint szerint' })
  @ApiOkResponse({ type: SearchResults, description: 'Találatok' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @Get()
  searchPotion(@Query() params: PotionSearchParams) {
    return this.potions.search(params);
  }

  @ApiOperation({ operationId: 'getPotion', summary: 'Bájital részletei', description: 'Részletes adatok a bájitalról' })
  @ApiOkResponse({ type: Potion, description: 'Bájital részletes adatai' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiNotFoundResponse({ description: 'A keresett bájital nem található' })
  @Get('/:potionId')
  getPotion(@Param() { potionId }: PotionIdRequest) {
    const potion = this.potions.getById(potionId);
    if (!potion) {
      throw new NotFoundException('A bájital nem található');
    }
    return potion;
  }

}