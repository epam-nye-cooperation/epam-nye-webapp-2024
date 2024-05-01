import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [ProductsController],
  imports: [ConfigModule],
  providers: [CategoryService, ProductService],
  exports: [CategoryService, ProductService],
})
export class ProductsModule {}
