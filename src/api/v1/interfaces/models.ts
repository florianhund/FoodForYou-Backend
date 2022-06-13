import { Document, ObjectId } from 'mongoose';
import { Allergenics, UserProvider } from './types';

export interface IMeal extends Document {
  name: string;
  price: number;
  isVegetarian: boolean;
  isVegan: boolean;
  description?: string;
  allergenics?: Allergenics[];
  tags?: string[];
}

// add phone number
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isVerified: boolean;
  otp: number | null;
  provider: UserProvider;
  providerId: string;
  isAdmin: boolean;
  // virtual
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
