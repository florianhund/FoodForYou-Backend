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
  restaurant: {
    ref: { type: String, default: 'Restaurant' },
    id: { type: Types.ObjectId, ref: 'Restaurant', required: true },
    href: String
  },
  images: [
    {
      mediaId: { type: String, default: 'prod/meals/defaults/default' },
      href: String
    }
  ],
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

  this.restaurant.href = `/restaurants/${this.restaurant.id}`;
  this.images = this.images.map(({ mediaId }: { mediaId: string }) => ({
    mediaId,
    href: `/images/${mediaId}`
  }));

  next();
});

meal.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as any;

  if (update.restaurant?.id) {
    update.restaurant.href = `/restaurants/${update.restaurant.id}`;
  }

  if (update.images?.length > 0) {
    update.images = update.images.map(({ mediaId }: { mediaId: string }) => ({
      mediaId,
      href: `/images/${mediaId}`
    }));
  }

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
