import { Document } from 'mongoose';

export interface IMeal extends Document {
  name: string;
  price: number;
  description?: string;
  allergenic?: string[];
}
