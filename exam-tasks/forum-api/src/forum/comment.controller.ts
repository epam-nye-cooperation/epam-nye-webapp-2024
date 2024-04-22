import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthToken, UserAuthToken } from '../auth/auth-token.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Comment, CommentMessage, CommentPath, CommentResponse } from './comment.dto';
import { ForumPath } from './forum.dto';
import { ForumService } from './forum.service';

@ApiTags('Comments')
@Controller('/forum/:forumId/comments')
export class CommentController {

  constructor(private forums: ForumService, private users: UsersService) {}

  @ApiOperation({ summary: 'Hozzászólások', description: 'Visszaadja az adott fórumhoz tartozó hozzászólásokat' })
  @ApiOkResponse({ type: [Comment], description: 'A hozzászólások listája' })
  @ApiNotFoundResponse({ description: 'A megadott fórum nem található' })
  @Get()
  getComments(
    @Param() { forumId }: ForumPath
  ) {
    const forum = this.forums.getForum(forumId);
    if (!forum) {
      throw new NotFoundException('A keresett fórum nem található');
    }
    return forum.comments.map((comment) => comment.toResponse(this.users));
  }

  @ApiOperation({ summary: 'Hozzászólás hozzáadasa', description: 'Új hozzászólás hozzáadasa a fórumhoz - csak belépett felhasználóknak' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: Comment, description: 'Rögzített hozzószálás' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiNotFoundResponse({ description: 'A megadott fórum nem található' })
  @Post()
  async addComment(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { forumId }: ForumPath,
    @Body() { message }: CommentMessage
  ): Promise<CommentResponse> {
    const created = await this.forums.addComment(userId, forumId, message);
    return created.toResponse(this.users);
  }

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [Comment], description: 'A hozzászólások listája' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiNotFoundResponse({ description: 'A megadott fórum vagy hozzászólás nem található' })
  @ApiForbiddenResponse({ description: 'Hozzáférés megtagadva - csak az eredeti felhasználó módosíthatja a hozzászólást' })
  @Patch('/:commentId')
  async updateComment(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { forumId, commentId }: CommentPath,
    @Body() { message }: CommentMessage
  ): Promise<CommentResponse[]> {
    const updated = await this.forums.updateComment(userId, forumId, commentId, message);
    return updated.map((comment) => comment.toResponse(this.users));
  }

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @ApiNoContentResponse({ description: 'Hozzászólás sikeresen törölve' })
  @ApiUnauthorizedResponse({ description: 'Ismeretlen felhasználó' })
  @ApiNotFoundResponse({ description: 'A megadott fórum vagy hozzászólás nem található' })
  @ApiForbiddenResponse({ description: 'Hozzáférés megtagadva - csak az eredeti felhasználó töröltheti a hozzászólást' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:commentId')
  async deleteComment(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { forumId, commentId }: CommentPath
  ) {
    await this.forums.deleteComment(userId, forumId, commentId);
  }
}