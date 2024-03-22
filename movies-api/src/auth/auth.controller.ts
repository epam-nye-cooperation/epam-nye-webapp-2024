import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
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

  @ApiOperation({
    summary: 'Profiladatok',
    description: 'Felhasználó adatainak lekérdezése'
  })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getProfile(@Request() req: AuthRequest) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Belépés',
    description: 'Belépés felhasználónévvel és jelszóval. A visszaadott Bearer token Authentication header-ben használható'
  })
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ description: 'Sikeres belépés - JWT Bearer token', type: String })
  @ApiBadRequestResponse({ description: 'Hibás adatok' })
  @ApiUnauthorizedResponse({ description: 'Hibás felhasználónév vagy jelszó' })
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

  @ApiOperation({
    summary: 'Regisztráció',
    description: 'Felhasználó regisztrálása a belépéshez szükséges adatokkal és kiegészítő információkkal'
  })
  @Post()
  @ApiBody({
    type: RegisterUserRequestBody,
  })
  @ApiCreatedResponse({ description: 'Sikeres regisztráció' })
  @ApiConflictResponse({ description: 'A megadott felhasználó már létezik' })
  @ApiBadRequestResponse({ description: 'Hibás adatok' })
  public async register(@Body() userData: RegisterUserRequestBody) {
    return {
      user: await this.users.register(userData),
    };
  }
}
