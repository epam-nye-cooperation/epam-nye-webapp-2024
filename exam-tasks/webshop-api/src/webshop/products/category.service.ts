import { Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { Category } from './products.type';

const DB_PATH = resolve(__dirname, '../../data/categories.json');

@Injectable()
export class CategoryService implements OnModuleInit {

  private logger = new Logger(CategoryService.name);
  private categories: Map<string, Category>;

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      this.categories = (JSON.parse(data) as Category[]).reduce((db, rawCategory) => {
        const category = new Category(rawCategory);
        db.set(category.id, category);
        return db;
      }, new Map<string, Category>());
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cannot find Categories!');
    }
  }

  getCategories(idFilters?: string[]) {
    const categoryList = Array.from(this.categories.values());
    return idFilters?.length ? categoryList.filter(({ id }) => idFilters.includes(id)) : categoryList;
  }
}