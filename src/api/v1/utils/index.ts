import HttpErrorModule from './HttpError';

export const HttpError = HttpErrorModule;

export const hasAllNullishValues = (obj: object) => {
  return Object.values(obj).every(val => val == null);
};
