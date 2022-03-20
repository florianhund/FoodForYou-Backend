import dotenv from 'dotenv';

dotenv.config();

export const PORT: number = process.env.PORT ? +process.env.PORT : 5000;
export const DATABASE_URL: string = process.env.DATABASE_URL || '';
