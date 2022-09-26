import { Document, ObjectId } from 'mongoose';
import { Allergenics, MealTag, UserProvider } from './types';

export interface IMeal extends Document {
  name: string;
  price: number;
  isVegetarian: boolean;
  isVegan: boolean;
  rating: number;
  calories: number;
  restaurant: ObjectId;
  description?: string;
  allergenics?: Allergenics[];
  tags?: MealTag[];
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

export interface IRestaurant extends Document {
  name: string;
  rating: number;
  address: string;
  postalCode: number;
}

export interface IOrder extends Document {
  orderTime: Date;
  deliveryTime: Date;
  isDelivered: boolean;
  address: string;
  postalCode: number;
  status: 'in progress' | 'in delivery' | 'delivered';
  isPaid: boolean;
  totalPrice: number;
  userId: ObjectId;
  meals: ObjectId[];
}
