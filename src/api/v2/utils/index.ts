import HttpErrorModule from './HttpError';

export const HttpError = HttpErrorModule;

export const hasAllNullishValues = (obj: object) => {
  return Object.values(obj).every(val => val == null);
};

export const hasNullishValues = (obj: object) => {
  return Object.values(obj).some(val => val == null || val === '');
};
