import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { SearchParams, SearchResultItem, SearchType } from '../search/search.type';
import { ApiProperty } from '@nestjs/swagger';
import { TrimmedText } from 'src/decorators/transform.trimmed-text';

export interface StoredPotion {
  name: string;
  potionId: string;
  characteristics?: string;
  difficulty?: string;
  effect?: string;
  image?: string;
  ingredients?: string;
  inventors?: string;
  manufacturers?: string;
  side_effects?: string;
  time: string;
  wiki: string;
}

export enum Difficulty {
  BEGINNER = 'Beginner',
  ADVANCED = 'Advanced',
  MODERATE = 'Moderate',
  OWL = 'Ordinary Wizarding Level',
  MASTER = 'Master',
}

export class Potion {
  @ApiProperty({ type: String, description: 'Főzet neve', example: 'Polyjuice potion' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Azonosító', example: 'polyjuice-potion' })
  @IsString()
  potionId: string;

  @ApiProperty({ type: String, description: 'Állag', example: 'Thick and mud-like, Bubbles slowly, Taste and colour varied depending on the person being turned into' })
  @IsOptional()
  @IsString()
  characteristics?: string;

  @ApiProperty({ type: String, description: 'Nehézség', example: Difficulty.ADVANCED })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({ type: String, description: 'Hatás', example: 'Allowed a human drinker to temporarily assume the form of another person"' })
  @IsOptional()
  @IsString()
  effect?: string;

  @ApiProperty({ type: String, format: 'URL', description: 'Kép', example: 'https://static.wikia.nocookie.net/harrypotter/images/1/1b/B2C12M2_Polyjuice_Potion_ready.jpg' })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({ type: [String], description: 'Összetevők', example: ["Lacewing flies (stewed for 21 days)", "Leeches", "Powdered bicorn horn"] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @ApiProperty({ type: String, description: 'Felfedezők', example: '' })
  @IsOptional()
  @IsString()
  inventors?: string;

  @ApiProperty({ type: String, description: 'Készítők', example: '' })
  @IsOptional()
  @IsString()
  manufacturers?: string;

  @ApiProperty({ type: String, description: 'Mellékhatások', example: 'Attempts to transform into animals or part-humans would not reverse automatically' })
  @IsOptional()
  @IsString()
  sideEffects?: string;

  @ApiProperty({ type: String, description: 'Elkészítési idő', example: 'One month' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiProperty({ type: String, description: 'További információk', example: 'https://harrypotter.fandom.com/wiki/Polyjuice_Potion' })
  @IsUrl()
  wiki: string;

  public parseRaw(raw: StoredPotion) {
    this.name = raw.name;
    this.potionId = raw.potionId;
    this.wiki = raw.wiki;
    this.effect = raw.effect;
    this.characteristics = raw.characteristics;
    this.difficulty = raw.difficulty ? raw.difficulty as Difficulty : Difficulty.MASTER;
    this.time = raw.time;
    this.image = raw.image || undefined;
    this.ingredients = raw.ingredients?.split(',').map((item) => item.trim());
    this.inventors = raw.inventors;
    this.manufacturers = raw.manufacturers;
    this.sideEffects = raw.side_effects;
  }

  searchResults(): SearchResultItem {
    return {
      id: this.potionId,
      type: SearchType.POTION,
      image: this.image,
      name: this.name,
      effect: this.effect,
      details: `/potions/${this.potionId}`,
    };
  }
}

export enum PotionSearchOrder {
  NAME_ASC = 'name.ASC',
  NAME_DESC = 'name.DESC',
  DIFFICULTY_ASC = 'difficulty.ASC',
  DIFFICULTY_DESC = 'diffuculty.DESC',
}

export class PotionSearchParams extends SearchParams<PotionSearchOrder> {
  @ApiProperty({ enum: SearchType, default: SearchType.POTION, description: 'Keresés típusa - nincs hatással az eredményekre' })
  type: SearchType = SearchType.POTION;

  @ApiProperty({ enum: Difficulty, required: false, description: 'Nehézség szerinti szűrés' })
  @IsOptional()
  @IsEnum(Difficulty, {each: true})
  difficulty?: Difficulty;

  @ApiProperty({ enum: PotionSearchOrder, default: PotionSearchOrder.NAME_ASC, description: 'Rendezés név vagy nehézség szerint' })
  @IsOptional()
  @IsEnum(PotionSearchOrder)
  orderBy?: PotionSearchOrder = PotionSearchOrder.NAME_ASC;
}

export class PotionIdRequest {
  @ApiProperty({ type: String, description: 'Bájital azonosítója', example: 'polyjuice-potion' })
  @TrimmedText()
  @IsString()
  @IsNotEmpty()
  potionId: string;
}
