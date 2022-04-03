import { Document } from 'mongoose';
import { Allergenics } from './types';

export interface IMeal extends Document {
  name: string;
  price: number;
  description?: string;
  allergenics?: Allergenics[];
}
