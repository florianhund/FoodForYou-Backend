import { Schema, model } from 'mongoose';

const meal = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  allergenic: [String]
});

export default model('meal', meal);
