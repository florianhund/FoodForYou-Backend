import { Document } from 'mongoose';
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
