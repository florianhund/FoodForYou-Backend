import { Schema, model } from 'mongoose';

import { IMeal } from '../interfaces/models';
import { Allergenics } from '../interfaces/types';

const meal = new Schema<IMeal>(
  {
    name: { type: String, required: true },
    description: {
      type: String,
      default: ''
    },
    price: { type: Number, required: true },
    allergenics: [
      {
        type: String,
        enum: Allergenics
      }
    ]
  }
  // ,{ strictQuery: false }
);

export default model<IMeal>('Meal', meal);
