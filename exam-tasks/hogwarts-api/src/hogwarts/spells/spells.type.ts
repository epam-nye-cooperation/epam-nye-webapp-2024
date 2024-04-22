import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { SearchParams, SearchResultItem, SearchType } from "../search/search.type";
import { ApiProperty } from "@nestjs/swagger";
import { TrimmedText } from "src/decorators/transform.trimmed-text";

export interface StoredSpell {
  name: string;
  spellId: string;
  category?: string;
  effect: string;
  hand?: string;
  image?: string;
  incantation?: string;
  light?: string;
  wiki: string;
}

export enum SpellCategory {
  CHARM = 'charm',
  SPELL = 'spell',
  HEALING_SPELL = 'healing spell',
  VANISMENT = 'vanishment',
  TRANSFIGURATION = 'transfiguration',
  DARK_CHARM = 'dark charm',
  JINX = 'jinx',
  CURSE = 'curse',
  MAGICAL_TRANSPORTATION = 'magical transportation',
  CONJURATION = 'conjuration',
  HEX = 'hex',
  TRANSFORMATION = 'transformation',
  COUNTER_CHARM = 'counter-charm',
  COUNTER_SPELL = 'counter-spell',
  DARK_ARTS = 'dark arts',
  COUNTER_CURSE = 'counter-curse',
  COUNTER_JINX = 'counter-jinx',
  BINDING_MAGICAL_CONTRACT = 'binding magical contract',
}

export class Spell {
  @ApiProperty({ type: String, description: 'Varázslat neve', example: 'Unlocking charm' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Azonosító', example: 'unlocking-charm' })
  @IsString()
  spellId: string;

  @ApiProperty({ enum: [SpellCategory], description: 'Kategória', example: ['charm'] })
  @IsOptional()
  @IsArray()
  @IsEnum(SpellCategory, { each: true })
  category?: SpellCategory[];

  @ApiProperty({ type: String, description: 'Hatás', example: 'Unlocked objects' })
  @IsString()
  effect: string;

  @ApiProperty({ type: String, description: 'Kézmozdulat', example: undefined })
  @IsOptional()
  @IsString()
  hand?: string;

  @ApiProperty({ type: String, format: 'URL', description: 'Kép', example: 'https://static.wikia.nocookie.net/harrypotter/images/0/0e/Alohomora.gif' })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({ type: String, description: 'Kiejtés', example: 'Alohomora(ah-LOH-ho-MOR-ah)' })
  @IsOptional()
  @IsString()
  incantation?: string;

  @ApiProperty({ type: String, description: 'Fény', example: 'Invisible, blue, yellow, or purple' })
  @IsOptional()
  @IsString()
  light?: string;

  @ApiProperty({ type: String, description: 'További információk', example: 'https://harrypotter.fandom.com/wiki/Unlocking_Charm' })
  @IsOptional()
  @IsUrl()
  wiki: string;

  public parseRaw(raw: StoredSpell) {
    this.name = raw.name;
    this.spellId = raw.spellId;
    this.effect = raw.effect;
    this.wiki = raw.wiki;
    this.category = raw.category?.split(/[\,\/]/i)
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
      .map((item) => item as SpellCategory);
    this.image = raw.image || undefined;
    this.incantation = raw.incantation;
    this.light = raw.light;
  }

  searchResults(): SearchResultItem {
    return {
      id: this.spellId,
      type: SearchType.SPELL,
      image: this.image,
      name: this.name,
      effect: this.effect,
      details: `/spells/${this.spellId}`,
    };
  }
}

export enum SpellSearchOrder {
  NAME_ASC = 'name.ASC',
  NAME_DESC = 'name.DESC',
  INCANTATION_ASC = 'incantation.ASC',
  INCANTATION_DESC = 'incantation.DESC',
}

export class SpellSearchParams extends SearchParams<SpellSearchOrder> {
  @ApiProperty({ enum: SearchType, default: SearchType.SPELL, description: 'Keresés típusa - nincs hatással az eredményekre' })
  type = SearchType.SPELL;

  @ApiProperty({ enum: SpellCategory, required: false, description: 'Varázslat kategóriája' })
  @IsOptional()
  @IsEnum(SpellCategory)
  category?: SpellCategory;

  @ApiProperty({ type: String, required: false, description: 'Fény' })
  @IsOptional()
  @IsString()
  light?: string;

  @ApiProperty({ enum: SpellSearchOrder, required: false, description: 'Rendezés', default: SpellSearchOrder.NAME_ASC })
  @IsOptional()
  @IsEnum(SpellSearchOrder)
  orderBy?: SpellSearchOrder = SpellSearchOrder.NAME_ASC;
}

export class SpellIdRequest {
  @ApiProperty({ type: String, description: 'A varázslat azonosítója', example: 'unlocking-charm' })
  @IsString()
  @TrimmedText()
  @IsNotEmpty()
  spellId: string;
}