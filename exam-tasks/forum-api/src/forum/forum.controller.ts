import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthToken, UserAuthToken } from '../auth/auth-token.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ForumService } from './forum.service';
import {
  AddForum,
  EditForum,
  ForumPath,
  ForumResponse,
  SearchForums,
  StoredForum,
} from './forum.dto';


@ApiTags('Forum')
@Controller('/forum')
export class ForumController {
  constructor(private users: UsersService, private forums: ForumService) {}

  @ApiOperation({
    summary: 'Fórum keresése',
    description: 'Keresés a fórumok és hozzászólások között tartalom és idő szerint',
  })
  @ApiOkResponse({ type: [ForumResponse] })
  @ApiBadRequestResponse({ description: 'Hibás keresési feltételek' })
  @Get()
  getForums(
    @AuthToken() token: UserAuthToken,
    @Query() searchParams: SearchForums
  ): ForumResponse[] {
    const forums = this.forums.search(searchParams, token?.userId);
    return forums.map((forum) => forum.toResponse(this.users));
  }

  @ApiOperation({
    summary: 'Fórum elérése',
    description: 'Fórum lekérdezése azonosító alapján'
  })
  @ApiOkResponse({ type: ForumResponse })
  @ApiNotFoundResponse({ description: 'A megadott fórum nem található' })
  @Get('/:forumId')
  getForum(
    @Param() { forumId }: ForumPath
  ): ForumResponse {
    const forum = this.forums.getForum(forumId);
    if (!forum) {
      throw new NotFoundException('A keresett fórum nem található');
    }
    return new StoredForum(forum).toResponse(this.users);
  }

  @ApiOperation({
    summary: 'Fórum létrehozása',
    description: 'Új fórum létrehozása címmel és leírással, bejelentkezett felhasználó segítségével'
  })
  @ApiCreatedResponse({ type: ForumResponse })
  @ApiBadRequestResponse({ description: 'Hibás bemeneti paraméterek' })
  @ApiConflictResponse({ description: 'Fórum a megadott címmel már létezik' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createForum(
    @AuthToken() token: UserAuthToken,
    @Body() forum: AddForum
  ): Promise<ForumResponse> {
    const created = await this.forums.createForum(token.userId, forum);
    return created.toResponse(this.users);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Módosítás',
    description: 'Fórum címének és leírásának módosítása - csak a fórum létrehozója módosíthatja'
  })
  @ApiOkResponse({ description: 'Sikeres módosítás' })
  @ApiConflictResponse({ description: 'Fórum a megadott címmel már létezik' })
  @ApiForbiddenResponse({ description: 'Hozzáférés megtagadva' })
  @ApiNotFoundResponse({ description: 'A megadott fórum nem található' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @Patch('/:forumId')
  async updateForum(
    @AuthToken() token: UserAuthToken,
    @Param() { forumId }: ForumPath,
    @Body() forum: EditForum
  ): Promise<ForumResponse> {
    if (!(forum.description || forum.title)) {
      const previous = this.forums.getForum(forumId);
      return Promise.resolve(new StoredForum(previous).toResponse(this.users));
    }
    const updated = await this.forums.updateForum(token.userId, forumId, forum);
    return updated.toResponse(this.users);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Fórum törlése',
    description: 'Megadott fórum és a hozzátartozó hozzászólások törlése - csak az törölheti, aki korábban létrehozta'
  })
  @ApiNotFoundResponse({ description: 'A keresett fórum nem található' })
  @ApiForbiddenResponse({ description: 'Hozzáférés megtagadva' })
  @ApiNoContentResponse({ description: 'Fórum sikeresen eltávolítva' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:forumId')
  deleteForum(
    @AuthToken() token: UserAuthToken,
    @Param() { forumId }: ForumPath
  ) {
    this.forums.deleteForum(token.userId, forumId);
  }
}
