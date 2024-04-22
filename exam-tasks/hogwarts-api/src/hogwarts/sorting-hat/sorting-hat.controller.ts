import { Body, ConflictException, Controller,Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthToken, UserAuthToken } from '../../auth/auth-token.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UsersService } from '../../users/users.service';
import { QuizAnswers } from './sorting-hat.types';
import { SortingHatService } from './sorting-hat.service';
import { RegisterUserResponse } from 'src/users/user.type';

@ApiTags('Sorting hat')
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('/sorting-hat')
export class SortingHatController {

  constructor(private sortingHat: SortingHatService, private users: UsersService) {}

  @ApiOperation({ operationId: 'assigment', summary: 'Beosztás', description: 'Beosztja az újonnan érkezőket a nekik megfelelő házakba, a kérdésekre adott válaszaik alapján' })
  @ApiOkResponse({ type: RegisterUserResponse, description: 'Módosított adatok' })
  @ApiConflictResponse({ description: 'A tanuló már be van osztva' })
  @Put()
  async assignment(@AuthToken() token: UserAuthToken, @Body() answers: QuizAnswers): Promise<RegisterUserResponse> {
    const user = this.users.findById(token.userId);
    if (user.house) {
      throw new ConflictException(`A tanulót nem lehet még egyszer beosztani`);
    }
    const house = this.sortingHat.evaluateAnswers(answers);
    const { password, ...userData } = await this.users.assignToHouse(user.userId, house.houseId);
    return userData;
  }

}
