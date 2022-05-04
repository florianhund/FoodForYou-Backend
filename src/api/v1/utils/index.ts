import ValidationErrorModule from './ValidationError';

export const ValidationError = ValidationErrorModule;

export const hasAllNullishValues = (obj: object) => {
  return Object.values(obj).every(val => val == null);
};
