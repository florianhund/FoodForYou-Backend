import dotenv from 'dotenv';

dotenv.config();

// if (process.env.NODE_ENV !== 'production') {
//   import('dotenv/config');
// }

const getDbUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DATABASE_URL || '';
  }
  if (process.env.NODE_ENV === 'development') {
    return process.env.DATABASE_URL_DEVELOPMENT || '';
  }
  return process.env.DATABASE_URL_TEST || '';
};

export const { NODE_ENV } = process.env;
export const PORT = process.env.PORT ? +process.env.PORT : 5000;
export const DATABASE_URL = getDbUrl();
