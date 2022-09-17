import { Schema, model } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { Allergenics, MealTag } from '../interfaces/types';

const meal = new Schema<IMeal>({
  name: { type: String, required: true },
  description: {
    type: String,
    default: ''
  },
  price: { type: Number, required: true },
  isVegetarian: { type: Boolean, required: true },
  rating: { type: Number, required: true },
  calories: { type: Number, required: true },
  isVegan: { type: Boolean, required: true },
  allergenics: [
    {
      type: String,
      enum: Allergenics
    }
  ],
  tags: [
    {
      type: String,
      enum: MealTag
    }
  ]
});

export default model<IMeal>('Meal', meal);
