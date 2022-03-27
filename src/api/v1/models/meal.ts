/* eslint-disable no-undef */
import { Schema, model } from 'mongoose';

import { IMeal } from '../interfaces/models';

const meal = new Schema<IMeal>({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  allergenic: [String]
});

export default model<IMeal>('Meal', meal);
