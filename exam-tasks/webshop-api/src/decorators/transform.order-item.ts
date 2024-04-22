import { Transform, TransformFnParams } from 'class-transformer';
import { createOrderItem } from '../webshop/orders/orders.type';

export function CreateOrderItem(): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.map((item) => {
          if ('productId' in item && 'quantity' in item) {
            return createOrderItem(item);
          }
          return null;
        }).filter(Boolean);
      } else if ('productId' in value && 'quantity' in value) {
        return createOrderItem(value);
      }
    }
    return value;
  });
}
