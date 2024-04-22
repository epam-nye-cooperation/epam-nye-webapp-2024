import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  imports: [ConfigModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
