import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { v4 as Uuid } from 'uuid';
import { BillingAddress, ShippingAddress } from '../../users/address.type';
import { ProductService } from '../products/products.service';
import { CreateOrderRequest, Order, OrderStatus } from './orders.type';

const DB_PATH = resolve(__dirname, '../../data/orders.json');

@Injectable()
export class OrderService implements OnModuleInit {
  private logger = new Logger(OrderService.name);

  private orders: Map<string, Order>;

  constructor(private products: ProductService) {}

  async onModuleInit() {
    try {
      const data = await readFile(DB_PATH, 'utf8');
      this.orders = JSON.parse(data).reduce(
        (db, rawOrder: any) => {
          const order = Order.create(rawOrder);
          db.set(order.orderId, order);
          return db;
        },
        new Map<string, Order>()
      );

    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Cannot find orders!');
    }
  }

  public async addOrder(userId: string, orderRequest: CreateOrderRequest): Promise<Order> {
    const items = orderRequest.items.reduce((map, item) => {
      map.set(item.productId, item.quantity);
      return map;
    }, new Map<string, number>());

    const products = this.products.getProductsByIdList(Array.from(items.keys()));

    if (products.length !== orderRequest.items.length) {
      throw new BadRequestException('A megrendelés olyan terméket tartalmaz, ami nem létezik');
    }
    const overOrders = products.filter((product) => {
      const item = items.get(product.id);
      return product.stock < item;
    });
    if (overOrders.length) {
      throw new ConflictException({
        message: 'A megrendelés nem teljesíthető: nincs megfelelő készlet',
        items: overOrders.map(({ id, stock }) => ({ id, stock, quantity: items.get(id) })),
      });
    }

    const order = Order.create({
      ...orderRequest,
      userId: userId,
      orderId: Uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: OrderStatus.NEW,
    });

    this.orders.set(order.orderId, order);
    await Promise.all([this.products.decreaseStock(items), this.save()]);
    return order;
  }

  public isUsersOrder(userId: string, orderId: string): boolean {
    const order = this.orders.get(orderId);
    return order && order.userId === userId;
  }

  public getOrders(userId: string): Order[] {
    return Array.from(this.orders.values())
      .filter((order) => order.userId === userId);
  }

  public getOrderById(orderId: string): Order | null {
    return this.orders.get(orderId) ?? null;
  }

  public async cancelOrder(orderId: string, reason: string): Promise<Order> {
    const order = this.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('A megadott megrendelés nem található');
    } else if (order.status !== OrderStatus.NEW) {
      throw new ConflictException('A megrendelés státusza már nem módosítható');
    }
    const update = Order.create({
      ...order,
      status: OrderStatus.CANCELED,
      updatedAt: new Date(),
      cancelReason: reason,
    });

    this.orders.set(orderId, update);
    const items = update.items.reduce((stock, item) => {
      stock.set(item.productId, item.quantity);
      return stock;
    }, new Map<string, number>());
    await Promise.all([this.save(), this.products.increaseStock(items)]);
    return update;
  }

  public async updateBillingAddress(orderId: string, address: BillingAddress): Promise<Order> {
    const order = this.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('A megrendelés nem található');
    } else if (order.status !== OrderStatus.NEW) {
      throw new ConflictException('A megrendelés már nem módosítható');
    }
    const update = Order.create({
      ...order,
      updatedAt: new Date(),
      billingAddress: address,
    });
    this.orders.set(orderId, order);
    await this.save();
    return update;
  }

  public async updateShippingAddress(orderId: string, address: ShippingAddress): Promise<Order> {
    const order = this.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('A megrendelés nem található');
    } else if (order.status !== OrderStatus.NEW) {
      throw new ConflictException('A megrendelés már nem módosítható');
    }
    const update = Order.create({
      ...order,
      updatedAt: new Date(),
      shippingAddress: address,
    });
    this.orders.set(orderId, update);
    await this.save();
    return update;    
  }

  private async save() {
    try {
      console.log(Array.from(this.orders.keys()));
      await writeFile(DB_PATH, JSON.stringify(Array.from(this.orders.values()), null, 2))
    } catch (err) {
      this.logger.error(err);
    }
  }
}
