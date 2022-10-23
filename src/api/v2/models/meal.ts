import { Schema, model, Types } from 'mongoose';
import cloudinary from '../../../config/cloudinary';

import { IMeal } from '../interfaces/models';
import { Allergenics, MealTag } from '../interfaces/types';
import ImageService from '../services/ImageService';

const imageSrv = new ImageService(cloudinary);

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

meal.pre('save', async function (next) {
  this.isVegetarian = !!this.tags?.includes(MealTag.VEGETARIAN);
  this.isVegan = !!this.tags?.includes(MealTag.VEGAN);

  this.restaurant.href = `/restaurants/${this.restaurant.id}`;
  this.images = await Promise.all(
    this.images.map(async ({ mediaId }: { mediaId: string }) => {
      const [id] = await imageSrv.changeFolder(mediaId, 'dev/meals');
      if (!id) throw new Error();
      return { mediaId: id, href: `/images/${id}` };
    })
  );

  next();
});

meal.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as any;

  if (update?.restaurant?.id) {
    update.restaurant.href = `/restaurants/${update.restaurant.id}`;
  }

  if (update?.images && update?.images?.length > 0) {
    update.images = await Promise.all(
      update.images.map(async ({ mediaId }: { mediaId: string }) => {
        const [id] = await imageSrv.changeFolder(mediaId, 'dev/meals');
        if (!id) throw new Error();
        return { mediaId: id, href: `/images/${id}` };
      })
    );
  }

  if (!update?.tags) return next();

  if (update?.tags.length === 0) {
    update.isVegetarian = false;
    update.isVegan = false;
    return next();
  }

  update.isVegetarian = !!update.tags.includes('Vegetarian');
  update.isVegan = !!update.tags.includes('Vegan');

  next();
});

export default model<IMeal>('Meal', meal);
