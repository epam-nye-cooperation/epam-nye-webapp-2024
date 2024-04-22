import { Transform, TransformFnParams } from 'class-transformer';
import { Address } from '../users/address.type';

const addressProperties: Array<keyof Address> = ['name', 'country', 'city', 'street', 'zip'];

const isAddress = (value: any) => {
  if (typeof value === 'object') {
    return addressProperties.every((key) => key in value);
  }
  return false;
};

export function CreateAddress(): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    if (isAddress(value)) {
      return new Address(value);
    }
    return value;
  });
}
