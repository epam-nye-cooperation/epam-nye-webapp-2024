import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { UsersModule } from '../../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  controllers: [OrderController],
  imports: [UsersModule, ProductsModule],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrdersModule {}
