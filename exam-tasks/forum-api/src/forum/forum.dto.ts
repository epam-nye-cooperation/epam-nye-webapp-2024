import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { Comment, CommentExample, CommentResponse } from './comment.dto';
import { ToBoolean } from '../decorators/transform.to-boolean';
import { ToDate } from '../decorators/transform.to-date';
import { UserResponse } from '../users/user.type';
import { UsersService } from '../users/users.service';
import { TrimmedText } from '../decorators/transform.trimmed-text';

export enum OrderBy {
  DATE_ASC = 'date.ASC',
  DATE_DESC = 'date.DESC',
  NAME_ASC = 'name.ASC',
  NAME_DESC = 'name.ESC',
}

export interface BaseForum {
  title: string;
  description: string;
}

export interface Forum extends BaseForum {
  id: string;
  createdBy: string;
  createdAt: Date;
  comments: Comment[];
}

export class EditForum implements Partial<BaseForum> {
  @ApiProperty({ type: String, description: 'Fórum elnevezése', example: 'Fórum cím', required: false })
  @TrimmedText()
  @IsOptional()
  @IsString({ message: 'Adja meg a fórum nevét!' })
  title?: string;

  @ApiProperty({ type: String, description: 'Fórum leírás', example: 'Fórum részletes leírása', required: false })
  @TrimmedText()
  @IsOptional()
  @IsString({ message: 'Adja meg a fórum leírását!' })
  description?: string;
}

export class AddForum implements BaseForum {
  @ApiProperty({ type: String, description: 'Fórum elnevezése', example: 'Fórum cím' })
  @TrimmedText()
  @IsNotEmpty({ message: 'Adja meg a fórum leírását!' })
  @IsString({ message: 'Adja meg a fórum nevét!' })
  @MaxLength(100, { message: 'A cím legfeljebb 100 karakter lehet' })
  title: string;

  @ApiProperty({ type: String, description: 'Fórum leírás', example: 'Fórum részletes leírása' })
  @TrimmedText()
  @IsNotEmpty({ message: 'Adja meg a fórum leírását!' })
  @IsString({ message: 'Adja meg a fórum leírását!' })
  @MaxLength(250, { message: 'A leírás legfeljebb 250 karakter lehet' })
  description: string;
}

export class StoredForum extends AddForum implements Forum {
  @IsUUID('all', { message: 'Hibás fórum azonosító' })
  id: string;

  @IsUUID('all', { message: 'Hibás felhasználói azonosító' })
  createdBy: string;

  @ToDate()
  @IsDate({ message: 'Hibás dátumformátum' })
  createdAt: Date;

  @IsOptional()
  @IsArray({ message: 'Hibás hozzászólások' })
  comments: Comment[] = [];

  constructor(forum?: Forum) {
    super();
    if (forum) {
      this.id = forum.id;
      this.createdBy = forum.createdBy;
      this.createdAt = new Date(forum.createdAt);
      this.title = forum.title;
      this.description = forum.description;
      this.comments = [...forum.comments];
    }
  }

  public getDateInfo(): number[] {
    return [
      this.createdAt.getTime(),
      ...this.comments.map(({ createdAt }) => createdAt.getTime())
    ];
  }

  public isUserRelated(userId: string): boolean {
    return this.createdBy === userId || this.comments.some((comment) => comment.userId === userId);
  }

  public getLastComment(): Comment | null {
    if (!this.comments.length) {
      return null;
    }
    return this.comments.reduce((latest, comment) => {
      return latest.createdAt.getTime() < comment.createdAt.getTime() ? comment : latest;
    }) ?? null;
  }

  public toResponse(users: UsersService): ForumResponse {
    const { id, title, description, createdBy, createdAt } = this;
    const { password, ...user } = users.findById(createdBy) || {};
    const lastComment = this.getLastComment();
    const commentsCount = this.comments.length;
    return {
      id,
      title,
      description,
      createdAt,
      createdBy: (user as UserResponse) ?? null,
      commentsCount,
      lastComment: lastComment?.toResponse(users) ?? null,
    };
  }
}

type ForumResponseInterface = Omit<Forum, 'createdBy' | 'comments'> & { createdBy: UserResponse; lastComment: CommentResponse | null };

const forumUserExample: UserResponse = {
  userId: '1c0cb5fe-2427-4627-9e36-fe93116f1bae',
  email: 'admin@local.com',
  firstName: 'Keresztnév',
  lastName: 'Vezetéknév',
};

export class ForumResponse implements ForumResponseInterface {
  @ApiProperty({ example: '53e0e8c4-bdb5-4057-ac9a-c7205559acf6' })
  id: string;

  @ApiProperty({ example: 'Fórum címe' })
  title: string;

  @ApiProperty({ example: 'Fórum leírása' })
  description: string;

  @ApiProperty({ example: '2024-03-07T23:55:27.431Z' })
  createdAt: Date;

  @ApiProperty({ example: forumUserExample })
  createdBy: UserResponse | null;

  @ApiProperty({ example: CommentExample })
  lastComment: CommentResponse | null;

  @ApiProperty({ example: 1 })
  commentsCount: number;
}

export class SearchForums {
  @ApiProperty({
    description: 'Keresés fórum nevében, leírásában és hozzászólások között',
    type: String,
    required: false,
  })
  @IsOptional()
  query?: string;

  @ApiProperty({
    description: 'Később mint',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate({ message: 'Hibás dátumformátum' })
  @ToDate({ hours: 0, minutes: 0, seconds: 0, milliSeconds: 0 })
  after?: Date;

  @ApiProperty({
    description: 'Korábban mint',
    type: Date,
    required: false,
  })
  @IsOptional()
  @IsDate({ message: 'Hibás dátumformátum' })
  @ToDate({ hours: 23, minutes: 59, seconds: 59, milliSeconds: 999 })
  before?: Date;

  @ApiProperty({
    description: 'Csak a belépett felhasználó fórumjai',
    type: Boolean,
    required: false,
    default: false,
  })
  @ToBoolean()
  @IsBoolean()
  @IsOptional()
  usersOnly?: boolean = false;

  @ApiProperty({
    description: 'Rendezés - felhasználó saját hozzászólásai, fórumjai előre',
    type: Boolean,
    required: false,
    default: false,
  })
  @ToBoolean()
  @IsBoolean()
  @IsOptional()
  usersFirst?: boolean = false;

  @ApiProperty({
    description: 'Rendezés',
    enum: OrderBy,
    required: false,
    default: OrderBy.DATE_DESC
  })
  @IsEnum(OrderBy, { message: ({ value, constraints }) => { return `A megadott rendezés ('${value}') nem elfogadható; válasszon az alábbiak közül: ${constraints[1]}` } })
  @IsOptional()
  orderBy?: OrderBy = OrderBy.DATE_DESC;
}

export class ForumPath {
  @ApiProperty({
    description: 'Fórum azonosítója',
    type: String,
  })
  @IsUUID()
  forumId: string;
}
