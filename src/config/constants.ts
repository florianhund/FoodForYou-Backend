import 'dotenv/config';

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

// TODO: throw error if one variable is null
export const {
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  COOKIE_KEY
} = process.env;
export const PORT = process.env.PORT ? +process.env.PORT : 5000;
export const DATABASE_URL = getDbUrl();
