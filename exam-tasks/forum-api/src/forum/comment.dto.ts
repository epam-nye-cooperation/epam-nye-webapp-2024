import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';
import { v4 as UUId } from 'uuid';
import { ToDate } from '../decorators/transform.to-date';
import { TrimmedText } from '../decorators/transform.trimmed-text';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../users/user.type';
import { Transform } from 'class-transformer';
import { ToNumber } from 'src/decorators/transform.to-number';

export interface BaseComment {
  id: string;
  message: string;
  createdAt: Date;
  userId: string;
};

export class CommentPath {
  @ApiProperty({ type: String, description: 'Fórum azonosítója' })
  @IsUUID()
  forumId: string;

  @ApiProperty({ type: String, description: 'Hozzászólás azonosítója' })
  @IsUUID()
  commentId: string;
}

export class CommentMessage {
  @ApiProperty({ type: String, description: 'Hozzászólás', example: 'Új hozzászólás' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'A hozzászólás nem lehet üres' })
  @MaxLength(250, { message: 'Maximum 250 karakter' })
  message: string;
}

export class Comment extends CommentMessage implements BaseComment {
  @ApiProperty({
    type: String,
    description: 'Hozzászólás azonosítója',
    example: '',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'A hozzászólás időpontja',
    example: '2024-03-07T23:55:27.431Z',
  })
  @ToDate()
  @IsDate({ message: 'Hibás dátumformátum' })
  createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Felhasználó azonosítója',
    example: '5c837fa6-3bf6-4e74-ab3a-80b996081d64',
  })
  @IsUUID('all', { message: 'Hibás felhasználó azonosító' })
  userId: string;

  constructor(comment?: BaseComment) {
    super();
    if (comment) {
      this.id = comment.id;
      this.createdAt = comment.createdAt;
      this.message = comment.message;
      this.userId = comment.userId;
    }
  }

  toResponse(users: UsersService): CommentResponse {
    const { id, message, createdAt, userId } = this;
    const user = users.findById(userId) ?? null;
    return {
      id,
      message,
      createdAt,
      user
    };
  }

  static create(userId: string, message: string): Comment {
    const comment = new Comment();
    comment.id = UUId();
    comment.userId = userId;
    comment.message = message;
    comment.createdAt = new Date();
    return comment;
  }
}

export type CommentResponse = Omit<BaseComment, 'userId'> & { user: UserResponse };

export const CommentExample: CommentResponse = {
  id: '28536457-1e1d-442f-bfcf-db2aa18e5311',
  message: 'Hozzászólás',
  createdAt: new Date(),
  user: {
    userId: 'ba5a94a6-598d-4963-b966-d12ea2504ec5',
    email: 'user@user.com',
    firstName: 'Keresztnév',
    lastName: 'Vezetéknév',
  },
}

export enum CommentOrder {
  ASC = 'ASC',
  DESC = 'DESC',
};

export class CommentQueryParams {
  @ApiProperty({ type: Number, description: 'Lapozás - kezdő elem', example: 0, required: false })
  @ToNumber()
  @IsOptional()
  @IsInt({ message: 'Nem egész szám' })
  @Min(0, { message: 'Pozitív egész szám' })
  offset?: number = 0;

  @ApiProperty({ type: Number, description: 'Lapozás - elemszám', example: 20, required: false })
  @ToNumber()
  @IsOptional()
  @IsInt({ message: 'Nem egész szám' })
  @Min(0, { message: 'Pozitív egész szám' })
  limit?: number = 20;

  @ApiProperty({ enum: CommentOrder, description: 'hozzászólások sorrendje', example: CommentOrder.DESC, required: false })
  @IsOptional()
  @IsEnum(CommentOrder, { message: 'A rendezés csak ASC vagy DESC értéket vehet fel' })
  orderBy?: CommentOrder = CommentOrder.DESC;
}

export class CommentResults {
  @ApiProperty({ type: [Comment], description: 'A fórumhoz tartozó kommentek' })
  comments: Comment[];

  @ApiProperty({ type: Number, description: 'Az összes hozzászólás száma' })
  total: number;
}
