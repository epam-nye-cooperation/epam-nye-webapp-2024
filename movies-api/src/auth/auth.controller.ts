import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  LoginRequest,
  RegisterUserRequestBody,
  User,
} from '../users/user.type';
import { UsersService } from 'src/users/users.service';

type AuthRequest = FastifyRequest & { user: User };

@ApiTags('Users')
@Controller('/user')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService
  ) {}

  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getProfile(@Request() req: AuthRequest) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: LoginRequest,
  })
  public async login(@Request() req: AuthRequest) {
    const accessToken = await this.auth.login(req.user);
    return {
      accessToken,
    };
  }

  @Post()
  @ApiBody({
    type: RegisterUserRequestBody,
  })
  public async register(@Body() userData: RegisterUserRequestBody) {
    return {
      user: await this.users.register(userData),
    };
  }
}
