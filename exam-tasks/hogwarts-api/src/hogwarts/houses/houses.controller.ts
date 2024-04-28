import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HouseService } from './houses.service';
import { House, HouseListItem, HouseRequest } from './houses.type';
import { AuthToken, UserAuthToken } from '../../auth/auth-token.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { User, UserListItem } from '../../users/user.type';

@ApiTags('Houses')
@Controller('/houses')
export class HouseController {

  constructor(private houses: HouseService) {}

  @ApiOperation({ operationId: 'getHouses', summary: 'Házak', description: 'Visszadja az elérhető házak listáját, limitált adatokkal' })
  @ApiOkResponse({ type: [HouseListItem], description: 'Házak' })
  @Get()
  getHouses(): HouseListItem[] {
    return this.houses.getHouses().map((house) => house.toList());
  }

  @ApiOperation({ operationId: 'getHouseById', summary: 'Részletes házadatok', description: 'Visszaadja a ház részletes adatait' })
  @ApiOkResponse({ type: House, description: 'Részletes házinformációk' })
  @ApiBadRequestResponse({ description: 'Érvénytelen házazonosító' })
  @ApiNotFoundResponse({ description: 'A keresett ház nem található' })
  @Get('/:houseId')
  getHouseById(@Param() { houseId }: HouseRequest): House {
    const house = this.houses.getHouse(houseId);
    if (!house) {
      throw new NotFoundException('A keresett ház nem található');
    }
    return house;
  }

  @ApiOperation({ operationId: 'getMembers', summary: 'Ház tanulói', description: 'Visszaadja a házakhoz tartozó tagok listáját' })
  @ApiOkResponse({ type: [HouseListItem], description: 'Tagok' })
  @ApiBadRequestResponse({ description: 'Érvénytelen házazonosító' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get('/:houseId/members')
  getMembers(
    @Param() { houseId }: HouseRequest
  ): UserListItem[] {
    return this.houses.getHouseMembers(houseId)
      .map(({ userId, firstName, lastName, email }: User) => ({ userId, firstName, lastName, email }));
  }
}
