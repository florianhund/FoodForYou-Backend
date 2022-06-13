import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/models';

const user = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: String,
    isVerified: { type: Boolean, required: true },
    otp: Number,
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
  },
  { toJSON: { virtuals: true } }
);

user.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});

// user.pre('save', async function () {
//   this.username = await bcrypt.hash(this.username, 10);
// });

export default model<IUser>('User', user);
