import { Schema, model } from 'mongoose';
import { IRestaurant } from '../interfaces/models';

const restaurant = new Schema<IRestaurant>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  description: String,
  location: String
});

export default model<IRestaurant>('Restaurant', restaurant);
