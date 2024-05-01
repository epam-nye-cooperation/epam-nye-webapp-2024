import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './products.service';
import { Category, CategoryWithProductCount, GetProductRequest, Product, ProductListItem, ProductSearchParams, ProductSearchResults } from './products.type';
import { CategoryService } from './category.service';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {

  constructor(private products: ProductService, private categories: CategoryService) {}

  @ApiOperation({ operationId: 'searchProducts', summary: 'Keresés', description: 'Keresés a termékek között név, leírás, kategória vagy ársáv szerint' })
  @ApiOkResponse({ type: ProductSearchResults, description: 'Keresési eredmények' })
  @Get()
  public searchProducts(
    @Query() searchParams: ProductSearchParams
  ): ProductSearchResults {
    const result = this.products.searchProducts(searchParams);
    return {
      data: result.slice(searchParams.offset, searchParams.offset + searchParams.limit).map((product) => product.toListItem()),
      total: result.length,
    };
  }

  @ApiOperation({ operationId: 'getProductsById', summary: 'Termékek listázása', description: 'Termékek listázása azonosító alapján' })
  @ApiQuery({ name: 'id', type: [String], description: 'Termékazonosítók', example: ['447dd9cd-3f35-4a40-a6c5-0097bf50643c', '1e2f3b8c-1750-44f8-b349-68c5d63f62ff'] })
  @ApiOkResponse({ type: [ProductListItem], description: 'Termékek' })
  @Get('/list')
  public getProducts(
    @Query() { id }: { id: string[] }
  ) {
    const result = this.products.getProductsByIdList(id);
    return result.map((product) => product.toListItem());
  }

  @ApiOperation({ operationId: 'getCategories', summary: 'Termékkategóriák', description: 'Visszaadja az elérhető termékkategóriákat' })
  @ApiOkResponse({ type: [CategoryWithProductCount], description: 'Elérhető termékkategóriák' })
  @ApiQuery({ name: 'id', type: [String], required: false, description: 'Szűrés azonosítóra', example: ['computers-tablets'] })
  @Get('/categories')
  public async getCategories(
    @Query() { id }: { id: string[] }
  ) {
    return this.categories.getCategories(id)
      .map((category) => new CategoryWithProductCount(category, this.products.getProductsCountByCategory(category.id)));
  }

  @ApiOperation({ operationId: 'getProduct', summary: 'Termék', description: 'Termék adatainak lekérdezése azonosító alapján' })
  @ApiOkResponse({ type: Product, description: 'A keresett termék' })
  @ApiNotFoundResponse({ description: 'a keresett termék nem található' })
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
