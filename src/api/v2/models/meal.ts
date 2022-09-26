import { Schema, model, Types } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { Allergenics, MealTag } from '../interfaces/types';

const meal = new Schema<IMeal>({
  name: { type: String, required: true },
  description: {
    type: String,
    default: ''
  },
  price: { type: Number, required: true },
  isVegan: { type: Boolean, default: false },
  isVegetarian: { type: Boolean, default: false },
  rating: { type: Number, required: true },
  calories: { type: Number, required: true },
  restaurant: { type: Types.ObjectId, ref: 'Restaurant', required: true },
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

meal.pre('save', function (next) {
  this.isVegetarian = !!this.tags?.includes(MealTag.VEGETARIAN);
  this.isVegan = !!this.tags?.includes(MealTag.VEGAN);
  next();
});

meal.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;

  if (!update?.tags) return next();

  if (update.tags.length === 0) {
    update.isVegetarian = false;
    update.isVegan = false;
    return next();
  }

  update.isVegetarian = !!update.tags.includes('Vegetarian');
  update.isVegan = !!update.tags.includes('Vegan');

  next();
});

export default model<IMeal>('Meal', meal);
