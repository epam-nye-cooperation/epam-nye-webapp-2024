import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './products.service';
import { GetProductRequest, Product, ProductSearchParams, ProductSearchResults } from './products.type';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {

  constructor(private products: ProductService) {}

  @ApiOperation({ summary: 'Keresés', description: 'Keresés a termékek között név, leírás, kategória vagy ársáv szerint' })
  @ApiOkResponse({ type: ProductSearchResults, description: 'Keresési eredmények' })
  @Get()
  public async searchProducts(
    @Query() searchParams: ProductSearchParams
  ): Promise<ProductSearchResults> {
    const result = this.products.searchProducts(searchParams);
    return {
      data: result.slice(searchParams.offset, searchParams.offset + searchParams.limit).map((product) => product.toListItem()),
      total: result.length,
    };
  }

  @ApiOperation({
    summary: 'Termékkategóriák',
    description: 'Visszaadja az elérhető termékkategóriákat'
  })
  @ApiOkResponse({ type: [String], description: 'Elérhető termékkategóriák' })
  @Get('/categories')
  public async getCategories() {
    return this.products.getCategories();
  }

  @ApiOperation({
    summary: 'Termék',
    description: 'Termék adatainak lekérdezése azonosító alapján'
  })
  @ApiOkResponse({
    type: Product,
    description: 'A keresett termék'
  })
  @ApiNotFoundResponse({
    description: 'a keresett termék nem található'
  })
  @Get('/:productId')
  public async getProduct(
    @Param() { productId }: GetProductRequest
  ) {
    const product = this.products.getProduct(productId);
    if (!product) {
      throw new NotFoundException('A kereseett termék nem található');
    }
    return product;
  }
}
