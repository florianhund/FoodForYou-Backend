import { Schema, model } from 'mongoose';
import { IRestaurant } from '../interfaces/models';

const restaurant = new Schema<IRestaurant>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true }
});

export default model<IRestaurant>('Restaurant', restaurant);
