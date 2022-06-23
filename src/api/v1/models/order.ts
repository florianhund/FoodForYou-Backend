import { Schema, model, Types } from 'mongoose';
import { Meal } from '.';

import { IMeal, IOrder } from '../interfaces/models';

const order = new Schema<IOrder>({
  orderTime: { type: Date, default: new Date() },
  deliveryTime: Date,
  isPaid: { type: Boolean, required: true, default: false },
  isDelivered: { type: Boolean, required: true, default: false },
  // 'in progress' | 'in delivery' | 'delivered'
  status: { type: String, required: true, default: 'in progress' },
  address: { type: String, required: true },
  postalCode: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
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

// ? update() refers to mongodb instead of mongoose model -> this doesnt refer to model
// order.pre('update', function (next) {
//   // TODO: update isDeliverd if deliveryTime is before Date.now()
//   if (this.get('isDelivered')) this.set({ status: 'delivered' });
//   next();
// });

order.pre('validate', async function (next) {
  this.totalPrice = await this.meals.reduce(async (total, id) => {
    const meal: IMeal | null = await Meal.findById(id);
    if (!meal) throw new Error();
    return (await total) + meal.price;
  }, Promise.resolve(0));

  next();
});

export default model<IOrder>('Order', order);
