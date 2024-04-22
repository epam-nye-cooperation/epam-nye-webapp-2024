import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthToken, UserAuthToken } from '../../auth/auth-token.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ShippingAddress } from '../../users/address.type';
import { ProductService } from '../products/products.service';
import { OrderService } from './orders.service';
import { CancelOrder, CreateOrderRequest, OrderRequest, UserOrder } from './orders.type';

@ApiTags('Orders')
@ApiUnauthorizedResponse({ description: 'Hozzáférés megtagadva' })
@ApiBearerAuth('bearer')
@UseGuards(JwtAuthGuard)
@Controller('/orders')
export class OrderController {

  constructor(private orders: OrderService, private products: ProductService) {}

  @ApiOperation({
    summary: 'Felhasználó megrendelései',
    description: 'Visszaadja a felhasználó saját megrendeléseit'
  })
  @ApiOkResponse({ type: [UserOrder], description: 'A felhasználó megrendelései' })
  @Get()
  getOrders(
    @AuthToken() { userId }: UserAuthToken
  ) {
    return this.orders.getOrders(userId).map((order) => new UserOrder(order, this.products));
  }

  @ApiOperation({
    summary: 'Megrendelés részletei',
    description: 'Visszaadja a felhasználó egy megrendelését'
  })
  @ApiOkResponse({ type: UserOrder, description: 'A megrendelés részletes adatai' })
  @ApiNotFoundResponse({ description: 'A megadott megrendelés nem található' })
  @Get('/:orderId')
  getOrderById(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { orderId }: OrderRequest
  ) {
    if (!this.orders.isUsersOrder(userId, orderId)) {
      throw new NotFoundException('A megadott megrendelés nem található');     
    }
    const order = this.orders.getOrderById(orderId);
    return new UserOrder(order, this.products);
  }

  @ApiOperation({
    summary: 'Megrendelés rögzítése',
    description: 'Rögzít egy új megrendelést az adatbázisban'
  })
  @ApiOkResponse({
    type: UserOrder,
    description: 'A létrehozott megrendelés'
  })
  @ApiBadRequestResponse({ description: 'Hibás megrendelés adatok' })
  @ApiConflictResponse({ description: 'Nem teljesíthető megrendelés' })
  @Post()
  async createOrder(
    @AuthToken() { userId }: UserAuthToken,
    @Body() orderRequest: CreateOrderRequest
  ) {
    const order = await this.orders.addOrder(userId, orderRequest);
    return new UserOrder(order, this.products);
  }

  @ApiOperation({
    summary: 'Visszamondás',
    description: 'Megrendelés visszamondása kötelező indoklással; csak új, még nem jóváhagyott megrendelések esetén'
  })
  @ApiOkResponse({
    type: UserOrder,
  })
  @ApiNotFoundResponse({ description: 'A megadott megrendelés nem található' })
  @ApiConflictResponse({ description: 'A megrendelés már nem módosítható' })
  @Delete('/:orderId')
  async cancelOrder(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { orderId }: OrderRequest,
    @Body() { reason }: CancelOrder
  ) {
    if (!this.orders.isUsersOrder(userId, orderId)) {
      throw new NotFoundException('A megadott megrendelés nem található');
    }
    const result = await this.orders.cancelOrder(orderId, reason);
    return new UserOrder(result, this.products);
  }

  @ApiOperation({
    summary: 'Szállítási cím módosítása',
    description: 'Módosítja a felhasználó egy megadott megrendeléséhez tartozó szállítási címet; csak új megrendelés esetén'
  })
  @ApiAcceptedResponse({ type: UserOrder, description: 'sikeres módosítás' })
  @ApiNotFoundResponse({ description: 'A megadott megrendelés nem található' })
  @ApiConflictResponse({ description: 'A megrendelés már nem módosítható' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('/:orderId/shippingAddress')
  async updateShippingAddress(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { orderId }: OrderRequest,
    @Body() address: ShippingAddress
  ) {
    if (!this.orders.isUsersOrder(userId, orderId)) {
      throw new NotFoundException('A megadott megrendelés nem található');
    }
    const result = await this.orders.updateShippingAddress(orderId, address);
    return new UserOrder(result, this.products);
  }

  @ApiOperation({
    summary: 'Számlázási cím módosítása',
    description: 'Módosítja a felhasználó egy megadott megrendeléséhez tartozó számlázási címet; csak új megrendelés esetén'
  })
  @ApiAcceptedResponse({ type: UserOrder, description: 'sikeres módosítás' })
  @ApiNotFoundResponse({ description: 'A megadott megrendelés nem található' })
  @ApiConflictResponse({ description: 'A megrendelés már nem módosítható' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('/:orderId/billingAddress')
  async updateBillingAddress(
    @AuthToken() { userId }: UserAuthToken,
    @Param() { orderId }: OrderRequest,
    @Body() address: ShippingAddress
  ) {
    if (!this.orders.isUsersOrder(userId, orderId)) {
      throw new NotFoundException('A megadott megrendelés nem található');     
    }
    const result = await this.orders.updateBillingAddress(orderId, address);
    return new UserOrder(result, this.products);
  }
}
