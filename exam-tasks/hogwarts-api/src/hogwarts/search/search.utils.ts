import { SearchOrder, SearchResultItem } from './search.type';

export class SearchUtils {

  static orderBy(orderBy: SearchOrder = SearchOrder.NAME_ASC) {
    return (a: SearchResultItem, b: SearchResultItem) => {
      const [fieldName, order] = orderBy.split('.');
      let result = a.name.localeCompare(b.name);
      if (typeof a[fieldName] === 'string' && b[fieldName] === 'string') {
        result = a[fieldName].localeCompare(b[fieldName]);
      }
      return order === 'ASC' ? result : -result;
    };
  }

}
