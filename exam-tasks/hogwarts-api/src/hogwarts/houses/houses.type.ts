import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

interface Name {
  firstName: string;
  lastName: string;
}

export interface StoredHouseData {
  houseId: HouseId;
  name: string;
  houseColors: string;
  commonRoom: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  heads: Name[];
  traits: string[];
  points: number;
}

export enum HouseId {
  GRYFFINDOR = 'gryffindor',
  RAVENCLAW = 'ravenclaw',
  HUFFLEPUFF = 'hufflepuff',
  SLYTHERIN = 'slytherin',
}

export enum HouseElements {
  FIRE = 'Fire',
  AIR = 'Air',
  EARTH = 'Earth',
  WATER = 'Water',
}

export class HouseListItem {
  @ApiProperty({ enum: HouseId, example: HouseId.GRYFFINDOR, description: 'Ház azonosítója' })
  houseId: HouseId;

  @ApiProperty({ type: String, example: 'Gryffindor', description: 'Ház neve' })
  name: string;

  @ApiProperty({ type: String, example: 'Gryffindor Tower', description: 'Klubhelyiség' })
  commonRoom: string;

  @ApiProperty({ type: String, example: 'https://static.wikia.nocookie.net/harrypotter/images/b/b1/Gryffindor_ClearBG.png/revision/latest?cb=20190222162949', description: 'Címer' })
  image: string;

  @ApiProperty({ type: Number, example: 0, description: 'Pontok', default: 0 })
  points: number;
}

export class House extends HouseListItem {
  @ApiProperty({ type: String, example: 'Scarlet and gold', description: 'Ház színei' })
  houseColors: string;

  @ApiProperty({ type: String, example: 'Godric Gryffindor', description: 'Alapító' })
  founder: string;

  @ApiProperty({ type: String, example: 'Lion', description: 'Jelkép' })
  animal: string;

  @ApiProperty({ enum: HouseElements, example: HouseElements.FIRE, description: 'Elem' })
  element: HouseElements;

  @ApiProperty({ type: String, example: 'Nearly-Headless Nick', description: 'Szellem' })
  ghost: string;

  @ApiProperty({ type: [Object], example: [{ firstName: 'Minerva', lastName: 'McGonagall' }], description: 'Házvezetők' })
  heads: Name[];

  @ApiProperty({ type: [String], example: ['Courage'], description: 'Ismérvek' })
  traits: string[];

  public import(raw: StoredHouseData) {
    this.animal = raw.animal;
    this.commonRoom = raw.commonRoom;
    this.element = raw.element as HouseElements;
    this.founder = raw.founder;
    this.ghost = raw.ghost;
    this.heads = raw.heads;
    this.houseColors = raw.houseColors;
    this.houseId = raw.houseId as HouseId;
    this.name = raw.name;
    this.traits = raw.traits;
    this.points = raw.points;
  }

  public toList(): HouseListItem {
    const item = new HouseListItem();
    item.houseId = this.houseId;
    item.commonRoom = this.commonRoom;
    item.image = this.image;
    item.name = this.name;
    item.points = this.points;
    return item;
  }

  public export(): StoredHouseData {
    return {
      animal: this.animal,
      commonRoom: this.commonRoom,
      element: this.element,
      founder: this.founder,
      ghost: this.ghost,
      heads: this.heads,
      houseColors: this.houseColors,
      houseId: this.houseId,
      name: this.name,
      traits: this.traits,
      points: this.points,
    };
  }
}

export class HouseRequest {
  @ApiProperty({ enum: HouseId, example: HouseId.GRYFFINDOR, description: 'Ház azonosítója' })
  @IsString({ message: 'Érvénytelen házazonosító' })
  houseId: HouseId;
}