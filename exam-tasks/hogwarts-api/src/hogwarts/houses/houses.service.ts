import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { House, HouseId } from './houses.type';
import { UsersService } from 'src/users/users.service';

const DB_PATH = resolve(__dirname, '../../data/houses.json');

@Injectable()
export class HouseService implements OnModuleInit {

  private logger = new Logger(HouseService.name);

  private houses = new Map<string, House>();

  constructor(private users: UsersService) {}

  async onModuleInit(): Promise<void> {
    try {
      const data = JSON.parse(await readFile(DB_PATH, 'utf-8'));
      this.houses = data.reduce((houses, houseData) => {
        const house = new House();
        house.import(houseData);
        houses.set(house.houseId, house);
        return houses;
      }, this.houses);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`Cannot load house data: ${error.message}`);
    }
  }

  getHouses(): House[] {
    return Array.from(this.houses.values());
  }

  getHouse(id: string): House | null {
    return this.houses.has(id) ? this.houses.get(id) : null;
  }

  async addPoints(id: HouseId, points: number): Promise<number | null> {
    const house = this.getHouse(id);
    if (!house) {
      return null;
    }
    house.points += points;
    if (house.points < 0) {
      this.logger.warn(`House ${house.name} points went negative: ${house.points} - normalized`);
      house.points = 0;
    }
    this.houses.set(id, house);
    await this.save();
    return house.points;
  }
  
  getHouseMembers(houseId: HouseId) {
    return this.users.findUserByHouseId(houseId);
  }

  private async save() {
    try {
      const data = Array.from(this.houses.values()).map((house) => house.export());
      await writeFile(DB_PATH, JSON.stringify(data, undefined, 2));
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(`Cannot save house info: ${error.message}`);
    }
  }

}