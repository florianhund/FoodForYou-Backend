import { Document, ObjectId } from 'mongoose';
import { Allergenics } from './types';

export interface IMeal extends Document {
  name: string;
  price: number;
  isVegetarian: boolean;
  isVegan: boolean;
  description?: string;
  allergenics?: Allergenics[];
  tags?: string[];
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
  address: string;
  postalCode: number;
  isVerified: boolean;
  otp: number | null;
  isAdmin: boolean;
  // virtual
  age: number;
  fullName: string;
}

export interface IOrder extends Document {
  orderTime: Date;
  deliveredTime: Date;
  isDelivered: boolean;
  // state: noticed | in order | in delivery | delivered
  isPaid: boolean;
  userId: ObjectId;
  meals: ObjectId[];
}
