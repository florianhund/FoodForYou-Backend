import dotenv from 'dotenv';

dotenv.config();

// if (process.env.NODE_ENV !== 'production') {
//   import('dotenv/config');
// }

const dbUrl: string = process.env.DATABASE_URL || '';
const testDbUrl: string = process.env.DATABASE_URL_TEST || '';

export const { NODE_ENV } = process.env;
export const PORT = process.env.PORT ? +process.env.PORT : 5000;
export const DATABASE_URL = process.env.NODE_ENV === 'test' ? testDbUrl : dbUrl;
