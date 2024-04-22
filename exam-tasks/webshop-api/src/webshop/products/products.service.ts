import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Product, ProductSearchParams, RawProduct } from './products.type';

import { Configuration } from '../../app.configuration';
import { ProductSearchFilters } from './products.search-filters';

const DB_PATH = resolve(__dirname, '../../data/products.json');

@Injectable()
export class ProductService implements OnModuleInit {
  private logger = new Logger(ProductService.name);

  private filters: ProductSearchFilters;
  private products: Map<string, Product>;
  private categories: Set<string>;

  constructor(config: ConfigService<Configuration>) {
    this.filters = new ProductSearchFilters(config.get('LANGUAGE'));
  }

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      this.products = (JSON.parse(data) as RawProduct[]).reduce((db, product) => {
        db.set(product.id, new Product(product));
        return db;
      }, new Map<string, Product>);
      this.categories = new Set(
        Array.from(this.products.values()).map(
          (product) => Array.from(product.categories.values())
        ).flat()
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cannot find products!');
    }
  }

  searchProducts(params: ProductSearchParams) {
    return Array.from(this.products.values())
      .filter(this.filters.byCategory(params.categories))
      .filter(this.filters.byQuery(params.query))
      .filter(this.filters.byRating(params.minRate, params.maxRate))
      .filter(this.filters.byPrice(params.minPrice, params.maxPrice))
      .filter(this.filters.toBeInStock(params.inStock))
      .sort(this.filters.orderBy(params.orderBy))
  }

  getCategories() {
    return Array.from(this.categories.values()).sort();
  }

  getProduct(productId: string): Product | null {
    if (!this.products.has(productId)) {
      return null;
    }
    return this.products.get(productId);
  }

  getProductsByIdList(productIds: string[]) {
    return productIds
      .map((productId) => this.getProduct(productId))
      .filter(Boolean);
  }

  public async decreaseStock(items: Map<string, number>): Promise<void> {
    return this.changeStock(items, -1);
  }

  public async increaseStock(items: Map<string, number>): Promise<void> {
    console.log('UPDATE STOCK', items);
    return this.changeStock(items, 1);
  }

  private changeStock(items: Map<string, number>, multiplier: 1 | -1) {
    Array.from(items.entries()).forEach(([productId, quantity]) => {
      const product = this.products.get(productId);
      product.stock += quantity * multiplier;
      console.log(product);
      this.products.set(product.id, product);
    });
    return this.save();
  }

  private async save() {
    try {
      await writeFile(DB_PATH, JSON.stringify(
        Array.from(this.products.values()).map((product) => {
          const { id, name, description, image, price, ratings, categories, stock } = product;
          return { id, name, description, image, price, ratings, categories, stock };
        }),
        null,
        2
      ))
    } catch (err) {
      this.logger.error(err);
    }
  }
}
