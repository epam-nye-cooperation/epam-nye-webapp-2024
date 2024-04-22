import { Product, ProductOrder } from './products.type';

export type SearchFilter = (product: Product) => boolean;
export type ProductSortFunction = (productA: Product, productB: Product) => number;

export class ProductSearchFilters {

  constructor(private lang: string) {}

  public byQuery(query?: string): SearchFilter {
    if (!query) {
      return Boolean;
    }
    const searchQuery = new RegExp(query.toLocaleLowerCase(this.lang), 'ig');
    return ({ name, description }: Product) => !!name.match(searchQuery) || !!description.match(searchQuery);
  }

  public byPrice(minPrice?: number, maxPrice?: number): SearchFilter {
    if (!minPrice && !maxPrice) {
      return Boolean;
    }
    return ({ price }: Product) => {
      return price >= (minPrice ?? 0) && price <= (maxPrice ?? Number.POSITIVE_INFINITY);
    }
  }

  public byRating(minRate?: number, maxRate?: number): SearchFilter {
    if ((!minRate && !maxRate) || (minRate === 1 && maxRate === 5)) {
      return Boolean;
    }
    return ({ rating }: Product) => rating >= (minRate ?? 1) && rating <= (maxRate ?? 5);
  }

  public byCategory(categoryFilters?: string[]) {
    if (!categoryFilters?.length) {
      return Boolean;
    }
    return ({ categories }: Product) => categoryFilters.some((category) => categories.has(category))
  }

  public toBeInStock(inStock?: boolean) {
    if (typeof inStock === 'undefined') {
      return Boolean;
    }
    return ({ stock }: Product) => inStock ? stock > 0 : stock <= 0;
  }

  public orderBy(order: ProductOrder): ProductSortFunction {
    const [field, ascOrDesc] = order.split('.');
    const direction = ascOrDesc === 'ASC' ? 1 : -1;
    return (productA: Product, productB: Product) => {
      const valueA = productA[field];
      const valueB = productB[field];
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * direction;
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * direction;
      }
      return 0;
    };
  }

}