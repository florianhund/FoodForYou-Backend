import { Schema, model } from 'mongoose';
import { IRestaurant } from '../interfaces/models';

const restaurant = new Schema<IRestaurant>({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  adderss: { type: String, required: true },
  postalCode: { type: String, required: true }
});

export default model<IRestaurant>('Restaurant', restaurant);
