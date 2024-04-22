import { Transform, TransformFnParams } from 'class-transformer';
import { Address, BillingAddress, ShippingAddress } from '../users/address.type';

const addressProperties: Array<keyof Address> = ['name', 'country', 'city', 'street', 'zip'];
const billingProps: Array<keyof BillingAddress> = []; //taxNumber: optional
const shippingProps: Array<keyof ShippingAddress> = ['phoneNumber'];

const isAddress = (value: any) => {
  if (typeof value === 'object') {
    return addressProperties.every((key) => key in value);
  }
  return false;
};

export function CreateAddress(type: 'billing' | 'shipping'): (target: any, key: string) => void {
  return Transform(({ value }: TransformFnParams) => {
    if (isAddress(value)) {
      if (type === 'billing') {
        return new BillingAddress(value);
      } else if (type === 'shipping' && shippingProps.every((key) => key in value)) {
        return new ShippingAddress(value);
      }
    }
    return value;
  });
}
