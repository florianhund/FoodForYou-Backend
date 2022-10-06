import validations from './validator';
import * as user from './user';
import multer from './multer';

export const validate = validations;
export const checkUser = user;
export const uploadImage = multer;
