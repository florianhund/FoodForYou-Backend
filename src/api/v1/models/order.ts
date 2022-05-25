import { Schema, model, Types } from 'mongoose';

import { IOrder } from '../interfaces/models';

const order = new Schema<IOrder>({
  orderTime: { type: Date, default: new Date() },
  deliveredTime: Date,
  isDelivered: { type: Boolean, required: true },
  isPaid: { type: Boolean, required: true },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  meals: [
    {
      type: Types.ObjectId,
      ref: 'Meal',
      required: true
    }
  ]
});

export default model<IOrder>('Order', order);
