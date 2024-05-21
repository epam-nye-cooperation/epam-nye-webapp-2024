import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequestBody,
  RegisterUserResponse,
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
  @ApiOkResponse({ type: RegisterUserResponse, description: 'Felhasználó profilja' })
  @ApiBearerAuth('bearer')
  @UseGuards(JwtAuthGuard)
  @Get()
  public getProfile(@Request() req: AuthRequest): RegisterUserResponse {
    const user = this.users.findById(req.user.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password, ...userData } = user;
    return userData;
  }

  @ApiOperation({
    summary: 'Belépés',
    description: 'Belépés felhasználónévvel és jelszóval. A visszaadott Bearer token Authentication header-ben használható'
  })
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ description: 'Sikeres belépés - JWT Bearer token', type: LoginResponse })
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
