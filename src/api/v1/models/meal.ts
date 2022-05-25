import { Schema, model } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { Allergenics } from '../interfaces/types';

const meal = new Schema<IMeal>({
  name: { type: String, required: true },
  description: {
    type: String,
    default: ''
  },
  price: { type: Number, required: true },
  isVegetarian: { type: Boolean, required: true },
  isVegan: { type: Boolean, required: true },
  allergenics: [
    {
      type: String,
      enum: Allergenics
    }
  ],
  tags: [String]
});

export default model<IMeal>('Meal', meal);
