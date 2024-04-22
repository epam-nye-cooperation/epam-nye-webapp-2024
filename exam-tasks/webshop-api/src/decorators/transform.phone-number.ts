import { Transform } from 'class-transformer';

export const PhoneNumber = (): PropertyDecorator => {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      const trim = value.trim();
      return trim.replace(/[^\d\+]*/gi, '');
    }
    return value;
  });
};
