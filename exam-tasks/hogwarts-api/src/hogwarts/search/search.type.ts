import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ToNumber } from 'src/decorators/transform.to-number';

export enum SearchType {
  POTION = 'potion',
  SPELL = 'spell'
}

export enum SearchOrder {
  NAME_ASC = 'name.ASC',
  NAME_DESC = 'name.DESC',
}

export class SearchParams<OrderBy = SearchOrder> {
  @ApiProperty({ enum: SearchType, required: false, description: 'Találatok szűkítése bájitalra vagy varázslatra' })
  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType;

  @ApiProperty({ type: String, required: false, description: 'Keresőkifejezés' })
  @IsOptional()
  @IsString()
  query?: string = '';

  @ApiProperty({ enum: SearchOrder, required: false, description: 'Eredmények rendezése', default: SearchOrder.NAME_ASC })
  @IsOptional()
  @IsEnum(SearchOrder)
  orderBy?: OrderBy = SearchOrder.NAME_ASC as OrderBy;

  @ApiProperty({ type: Number, required: false, description: 'Eredmények kezdete', default: 0 })
  @IsOptional()
  @ToNumber()
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiProperty({ type: Number, required: false, description: 'Maximum elemszám - legfeljebb 100', default: 20 })
  @IsOptional()
  @ToNumber()
  @IsInt()
  @Min(0)
  @Max(100)
  limit?: number = 20;
}

export class SearchResultItem {
  @ApiProperty({ type: String, description: 'Azonosító', example: '499b6b93-5d3f-4d8d-afb3-d808737d28f0' })
  id: string;

  @ApiProperty({ type: String, description: 'Bájital vagy varázslat neve', example: 'Unlocking Charm' })
  name: string;

  @ApiProperty({ enum: SearchType, description: 'Találat típusa', example: SearchType.SPELL })
  type: SearchType;

  @ApiProperty({ type: String, description: 'Részletes adatok elérése', format: 'URL', example: '/spells/unlocking-charm' })
  details: string;

  @ApiProperty({ type: String, format: 'URL', description: 'Kép (opcionális)', example: 'https://static.wikia.nocookie.net/harrypotter/images/0/0e/Alohomora.gif,Alohomora(ah-LOH-ho-MOR-ah)' })
  image?: string;

  @ApiProperty({ type: String, required: false, description: 'Hatás', example: 'Unlocked objects' })
  effect?: string;
}

export interface SearchResultMap {
  searchResults: () => SearchResultItem;
}

export class SearchResults {
  @ApiProperty({ type: Number, description: 'Összes találat száma', example: 1 })
  total: number;

  @ApiProperty({ type: [SearchResultItem], description: 'Találatok listája' })
  results: SearchResultItem[];

  constructor(total: number, items: SearchResultMap[]) {
    this.total = total;
    this.results = items.map((item) => item.searchResults());
  }
}
