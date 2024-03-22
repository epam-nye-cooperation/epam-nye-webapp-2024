import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { v4 as uuid } from 'uuid';
import { RegisterUserRequestBody, User } from './user.type';
import { Configuration } from '../app.configuration';

const DB_PATH = resolve(__dirname, '../data/users.json');
const SALT_ROUNDS = 10;

@Injectable()
export class UsersService implements OnModuleInit {
  private logger = new Logger(UsersService.name);
  private users: User[] = [];

  constructor(private config: ConfigService<Configuration>) {}

  async onModuleInit(): Promise<void> {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      this.users = JSON.parse(data).map((rawUser: User) => {
        return Object.keys(rawUser).reduce((user, key) => {
          user[key] = rawUser[key];
          return user;
        }, {} as User);
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Configuration issue - cannot find users!');
    }
  }

  public findOne(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  public createPasswordHash(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
  }

  public async register(userData: RegisterUserRequestBody) {
    if (this.findOne(userData.username)) {
      throw new ConflictException('Ez a felhasználónév már foglalt');
    }
    const user: User = {
      userId: uuid(),
      email: userData.username,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: await this.createPasswordHash(userData.password),
    };
    this.users = [...this.users, user];
    this.save();
  }

  private async save() {
    if (!this.config.get('AUTO_SAVE')) {
      return;
    }
    try {
      await writeFile(DB_PATH, JSON.stringify(this.users, null, 2));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
