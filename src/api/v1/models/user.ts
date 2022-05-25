import { Schema, model } from 'mongoose';

import { IUser } from '../interfaces/models';

const user = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: Number, required: true },
    isVerified: { type: Boolean, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  { toJSON: { virtuals: true } }
);

user.virtual('age').get(function (this: IUser) {
  const diff = Date.now() - this.birthday.getTime();
  const date = new Date(diff);
  return Math.abs(date.getUTCFullYear() - 1970);
});

user.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

export default model<IUser>('User', user);
