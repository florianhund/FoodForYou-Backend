import { Schema, model, Types } from 'mongoose';

import { Meal } from '.';
import { Link } from '../interfaces';
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
  user: {
    ref: { type: String, default: 'User' },
    id: { type: Types.ObjectId, ref: 'User', required: true },
    href: String
  },
  meals: [
    {
      ref: { type: String, default: 'Meal' },
      id: { type: Types.ObjectId, ref: 'Meal', required: true },
      href: String
    }
  ]
});

// ? update() refers to mongodb instead of mongoose model -> this doesnt refer to model
// order.pre('update', function (next) {
//   // TODO: update isDeliverd if deliveryTime is before Date.now()
//   if (this.get('isDelivered')) this.set({ status: 'delivered' });
//   next();
// });

order.pre('save', function (next) {
  this.user.href = `/users/${this.user.id}`;
  this.meals = this.meals.map(meal => {
    const { id, ref } = meal;
    return { id, ref, href: `/meals/${meal.id}` };
  });

  next();
});

order.pre('validate', async function (next) {
  this.totalPrice = await this.meals.reduce(async (total, link) => {
    const meal: IMeal | null = await Meal.findById(link.id);
    if (!meal) throw new Error();
    return (await total) + meal.price;
  }, Promise.resolve(0));

  next();
});

order.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() as any;
  const meals: Link[] | undefined = update?.meals;
  const isDelivered: boolean | undefined = update?.isDelivered;

  if (update?.user?.id) {
    update.user.href = `/users/${update.user.id}`;
  }

  if (isDelivered) update.status = 'delivered';

  if (!meals || meals.length === 0) return next();

  update.meals = update.meals.map((meal: any) => {
    const { id, ref } = meal;
    return { id, ref, href: `/meals/${meal.id}` };
  });

  update.totalPrice = await meals.reduce(async (total, link) => {
    const meal: IMeal | null = await Meal.findById(link.id);
    if (!meal) throw new Error();
    return (await total) + meal.price;
  }, Promise.resolve(0));

  next();
});

export default model<IOrder>('Order', order);
