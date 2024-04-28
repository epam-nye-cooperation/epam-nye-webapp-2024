import { Body, Controller, ForbiddenException, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthToken, UserAuthToken } from 'src/auth/auth-token.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LearnService } from 'src/hogwarts/learn/learn.service';
import { UsersService } from 'src/users/users.service';
import { SearchResultItem } from '../search/search.type';
import { Potion, PotionIdRequest } from '../potions/potions.type';
import { Spell, SpellIdRequest } from '../spells/spells.type';

@ApiBearerAuth('bearer')
@ApiTags('Learn')
@ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
@ApiForbiddenResponse({ description: 'A tanuló még nincs házhoz osztva' })
@UseGuards(JwtAuthGuard)
@Controller('/user/learn')
export class LearningController {

  constructor(private users: UsersService, private learn: LearnService) {}

  @ApiOperation({ operationId: 'getLearnedSpells', 'summary': 'Megtanult varázslatok', description: 'Visszaadja a már megtanult varázslatok azonosítóit' })
  @ApiOkResponse({ type: [String], description: 'A megtanult varázslatok azonosítói' })
  @Get('/spells')
  getLearnedSpells(
    @AuthToken() { userId }: UserAuthToken
  ) {
    this.checkUserEligibility(userId)
    return this.learn.getLearnedSpells(userId).map((spell) => spell.spellId);
  }

  @ApiOperation({ operationId: 'learnSpell', summary: 'Varázslat elsajátítása', description: 'A tanuló megtanulja a varázslatot használni és később használni is tudja azt.' })
  @ApiCreatedResponse({ type: Spell, description: 'Az újonnan megtanult varázslat' })
  @ApiConflictResponse({ description: 'A varázslatot már megtanulta' })
  @ApiNotFoundResponse({ description: 'A varázslat nem található' })
  @Post('/spells')
  learnSpell(
    @AuthToken() { userId }: UserAuthToken,
    @Body() { spellId }: SpellIdRequest
  ) {
    const user = this.checkUserEligibility(userId);
    return this.learn.learnSpell(user, spellId);
  }

  @ApiOperation({ operationId: 'getLearnedPotions', summary: 'Megtanult bájitalok', description: 'Visszaadja a már megtanult bájitalok azonosítóit' })
  @ApiOkResponse({ type: [String], description: 'A megtanult bájitalok azonosítói' })
  @ApiCreatedResponse({ type: [SearchResultItem], description: 'A megtanult bájitalok listája' })
  @Get('/potions')
  getLearnedPotions(
    @AuthToken() { userId }: UserAuthToken
  ) {
    this.checkUserEligibility(userId);
    return this.learn.getLearnedPotions(userId).map((potion) => potion.potionId);
  }

  @ApiOperation({ operationId: 'learnPotion', summary: 'Bájital elsajátítása', description: 'A tanuló megtanulja a bájitalt elkészíteni és később használni is tudja. Fokozattól függően a ház különböző pontokat kap' })
  @ApiCreatedResponse({ type: Potion, description: 'Az újonan megtanult bájital' })
  @ApiConflictResponse({ description: 'Ez már megtanult bájial' })
  @ApiNotFoundResponse({ description: 'A bájital nem található' })
  //@ApiForbiddenResponse({ description: 'Alacsony képzettségi szint' })
  @Post('/potions')
  async learnPotion(
    @AuthToken() { userId }: UserAuthToken,
    @Body() { potionId }: PotionIdRequest
  ) {
    const user = this.checkUserEligibility(userId);
    return this.learn.learnPotion(user, potionId);
  }

  private checkUserEligibility(userId: string) {
    const user = this.users.findById(userId);
    if (!user?.house) {
      throw new ForbiddenException('Nincs beosztva');
    }
    return user;
  }
}
