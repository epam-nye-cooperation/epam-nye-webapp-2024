import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";
import { ToBoolean } from "../../decorators/transform.to-boolean";
import { ToNumber } from "../../decorators/transform.to-number";
import { TrimmedText } from "../../decorators/transform.trimmed-text";

export enum ProductOrder {
  NAME_ASC = 'name.ASC',
  NAME_DESC = 'name.DESC',
  RATING_ASC = 'rating.ASC',
  RATING_DESC = 'rating.DESC',
  PRICE_ASC = 'price.ASC',
  PRICE_DESC = 'price.DESC',
}

export class Category {
  @ApiProperty({ type: String, description: 'Kategória-azonosító', example: 'computers-tablets' })
  id: string;

  @ApiProperty({ type: String, description: 'Kategória neve', example: 'Computers & Tablets' })
  name: string;

  @ApiProperty({ type: String, format: 'URL', description: 'Kategóriához tartozó kép', example: 'https://picsum.photos/400/400.jpg' })
  image: string;

  constructor(category?: Category) {
    this.id = category?.id;
    this.name = category?.name;
    this.image = category?.image;
  }
}

export class CategoryWithProductCount extends Category {
  @ApiProperty({ type: Number, description: 'A kategóriához tartozó termékek száma', example: 9 })
  productCount: number;

  constructor(category: Category, productCount: number) {
    super(category);
    this.productCount = productCount;
  }
}

export interface RawProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  ratings: Record<string, number>;
  categories: string[];
  stock: number;
}

export interface ProductListItemInterface {
  id: string;
  name: string;
  image: string;
  price: number;
  rating?: number;
  categories: Set<string>;
  stock: number;
}

export class ProductListItem implements ProductListItemInterface {
  @ApiProperty({ type: String, description: 'Termékazonosító', example: '447dd9cd-3f35-4a40-a6c5-0097bf50643c' })
  id: string;

  @ApiProperty({ type: String, description: 'Termék neve', example: 'iPhone 16 Pro Max' })
  name: string;

  @ApiProperty({ type: String, description: 'Termékkép URL', example: 'https://picsum.photos/640/480.jpg' })
  image: string;

  @ApiProperty({ type: Number, description: 'Termék ára ($)', example: 1719.8 })
  price: number;

  @ApiProperty({ type: Number, required: false, description: 'Termék átlagos értékelése', example: '4.1' })
  rating?: number;

  @ApiProperty({ type: [String], description: 'Termékhez tartozó kategóriák', example: ['Computers & Tablets'] })
  categories: Set<string>;

  @ApiProperty({ type: Number, description: 'Készlet', example: 10 })
  stock: number;

  constructor(data?: ProductListItemInterface) {
    this.id = data?.id;
    this.name = data?.name;
    this.image = data?.image;
    this.price = data?.price;
    this.rating = data?.rating;
    this.categories = data?.categories;
    this.stock = data?.stock;
  }
}

export class Product extends ProductListItem {
  @ApiProperty({ type: String, description: 'Termék részletes leírása' })
  description: string;

  @ApiProperty({ type: Object, description: 'Termékértékelések' })
  ratings?: Record<string, number>;

  constructor(data?: RawProduct) {
    super(data && {
      ...data,
      rating: undefined,
      categories: new Set(data.categories),
    });
    this.ratings = {};
    if (data) {
      const { description, ratings } = data;
      this.description = description;
      this.ratings = ratings ?? {};
      const rates = Object.values(this.ratings);
      this.rating = rates.length > 0 && Math.round(rates.reduce((total, rate) => total + rate, 0) / rates.length) || undefined;
    }
  }

  setRate(userId: string, rate: number) {
    this.ratings[userId] = rate;
  }

  toListItem(): ProductListItem {
    return new ProductListItem(this);
  }
}

export class ProductSearchParams {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Kereső kifejezés'
  })
  @IsOptional()
  @IsString()
  @TrimmedText()
  query?: string;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Ár (minimum)',
  })
  @ToNumber()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Ár (maximum)',
  })
  @ToNumber()
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Készleten',
  })
  @ToBoolean()
  @IsOptional()
  inStock?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Értékelés (minimum)',
  })
  @ToNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  minRate?: number;
  
  @ApiProperty({
    type: Number,
    required: false,
    description: 'Értékelés (maximum)',
  })
  @ToNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  maxRate?: number;

  @ApiProperty({
    type: [String],
    required: false,
    description: 'Kategóriák',
    example: ['cameras-photo']
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return [value];
    }
    return value;
  })
  @IsArray()
  categories?: string[];

  @ApiProperty({
    enum: ProductOrder,
    required: false,
    default: ProductOrder.NAME_ASC,
    description: 'Rendezés'
  })
  @IsOptional()
  @IsEnum(ProductOrder, { message: ({ constraints }) => `A rendezés az alábbiak közül választható: ${constraints[1].join(', ')}` })
  orderBy?: ProductOrder = ProductOrder.NAME_ASC;

  @ApiProperty({
    type: Number,
    required: false,
    default: 0,
    description: 'Eltolás'
  })
  @ToNumber()
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @ApiProperty({
    type: Number,
    required: false,
    default: 12,
    description: 'Elemszám'
  })
  @ToNumber()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 12;
}

export class GetProductRequest {
  @ApiProperty({
    type: String,
    description: 'Termék azonosító száma',
    example: '447dd9cd-3f35-4a40-a6c5-0097bf50643c'
  })
  @IsUUID('all', { message: 'Érvénytelen termékazonosító' })
  productId: string;
}

export class ProductSearchResults {
  @ApiProperty({ type: [ProductListItem], description: 'Termékek' })
  data: ProductListItem[];

  @ApiProperty({ type: Number, description: 'Összes találat' })
  total: number;
}
