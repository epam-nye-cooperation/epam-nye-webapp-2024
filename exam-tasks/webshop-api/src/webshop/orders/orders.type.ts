import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min, ValidateNested } from 'class-validator';
import { CreateAddress } from '../../decorators/transform.address';
import { CreateOrderItem } from '../../decorators/transform.order-item';
import { TrimmedText } from '../../decorators/transform.trimmed-text';
import { BillingAddress, ShippingAddress } from '../../users/address.type';
import { ProductService } from '../products/products.service';
import { Product } from '../products/products.type';

export enum OrderStatus {
  NEW = 'new',
  ACCEPTED = 'accepted',
  FULFILLED = 'fulfilled',
  CANCELED = 'cancelled',
}

export class OrderItem {
  @ApiProperty({ type: String, description: 'Termékazonosító', example: '447dd9cd-3f35-4a40-a6c5-0097bf50643c' })
  @IsUUID()
  productId: string;

  @ApiProperty({ type: Number, description: 'Darabszám', example: 5 })
  @IsNumber()
  @Min(1, { message: 'Legalább 1 darab' })
  quantity: number;

  price?: number;
}

export const createOrderItem = (item: OrderItem): OrderItem => {
  const object = new OrderItem();
  object.productId = item.productId;
  object.quantity = item.quantity;
  object.price = item.price;
  return object;
};

export class CreateOrderRequest {
  @ApiProperty({ type: String, required: false, description: 'Egyéb megjegyzés', example: 'A csengő nem működik' })
  @TrimmedText()
  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Legfeljebb 255 karakter' })
  comment?: string;

  @ApiProperty({ type: BillingAddress, description: 'Számlázási cím' })
  @CreateAddress('billing')
  @ValidateNested()
  billingAddress: BillingAddress;

  @ApiProperty({ type: ShippingAddress, description: 'Szállítási cím' })
  @CreateAddress('shipping')
  @ValidateNested()
  shippingAddress: ShippingAddress;

  @ApiProperty({ type: [OrderItem], description: 'Megrendelt termékek' })
  @CreateOrderItem()
  @ValidateNested({ each: true })
  @ArrayNotEmpty({ message: 'Legalább egy termék hozzáadása kötelező' })
  items: OrderItem[];
}

export class Order extends CreateOrderRequest {
  userId: string;

  orderId: string;

  status: OrderStatus = OrderStatus.NEW;

  cancelReason?: string;

  createdAt: Date;

  updatedAt: Date;

  public static create(rawOrder: Order) {
    const object = new Order();
    object.orderId = rawOrder.orderId;
    object.status = rawOrder.status;
    object.comment = rawOrder.comment;
    object.billingAddress = new BillingAddress(rawOrder.billingAddress);
    object.shippingAddress = new ShippingAddress(rawOrder.shippingAddress);
    object.items = rawOrder.items.map((item) => createOrderItem(item));
    object.cancelReason = rawOrder.cancelReason;
    object.createdAt = new Date(rawOrder.createdAt);
    object.updatedAt = new Date(rawOrder.updatedAt);
    object.userId = rawOrder.userId;
    return object;
  }
}

export class UserOrderItem {
  @ApiProperty({ type: Product, description: 'Termék' })
  product: Product;

  @ApiProperty({ type: Number, description: 'darabszám' })
  quantity: number;

  constructor(item: OrderItem, products: ProductService) {
    this.product = products.getProduct(item.productId);
    this.product.price = item.price ?? this.product.price;
    this.quantity = item.quantity;
  }
};

export class UserOrder {
  @ApiProperty({ type: String, description: 'Megrendelés azonosító', example: '97913e7c-c5fd-47f3-aed9-bcb306c8e7a7' })
  orderId: string;

  @ApiProperty({ enum: OrderStatus, description: 'Megrendelés állapota', example: OrderStatus.NEW })
  status: OrderStatus;

  @ApiProperty({ type: Date, description: 'Megrendelés ideje', example: new Date() })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'Módosítás időpontja', example: new Date() })
  updatedAt: Date;

  @ApiProperty({ type: String, description: 'Megjegyzés', example: 'A kapucsengő nem működik' })
  comment?: string;

  @ApiProperty({ type: String, required: false, description: 'Lemondás oka' })
  cancelReason?: string;

  @ApiProperty({ type: BillingAddress, description: 'Számlázási cím' })
  billingAddress: BillingAddress;

  @ApiProperty({ type: ShippingAddress, description: 'Szállítási cím' })
  shippingAddress: ShippingAddress;

  @ApiProperty({ type: Number, description: 'Megrendelés összértéke' })
  total: number;

  @ApiProperty({ type: [UserOrderItem], description: 'Megrendelés elemei' })
  items: UserOrderItem[];

  constructor(order: Order, products: ProductService) {
    this.orderId = order.orderId;
    this.status = order.status;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.comment = order.comment;
    this.cancelReason = order.cancelReason;
    this.billingAddress = order.billingAddress;
    this.shippingAddress = order.shippingAddress;
    this.total = order.items.reduce((total, item) => total + (item.quantity * item.price), 0);
    this.items = order.items.map((item) => new UserOrderItem(item, products));
  }
}

export class OrderRequest {
  @ApiProperty({
    type: String,
    description: 'Megrendelés azonosítója'
  })
  @IsUUID('all', { message: 'Hibás rendelés azonosító' })
  orderId: string;
}

export class CancelOrder {
  @ApiProperty({
    type: String,
    description: 'A megrendelés visszamondásának oka',
    example: 'mégsem szeretném megrendelni'
  })
  @TrimmedText()
  @IsString()
  @IsNotEmpty({ message: 'Indoklja a megrendelés visszamondását!' })
  reason: string;
}
