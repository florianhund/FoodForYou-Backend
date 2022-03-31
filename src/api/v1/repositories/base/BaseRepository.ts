import mongoose from 'mongoose';

import { IRead, IWrite } from '../../interfaces';

export default class BaseRepository<T extends mongoose.Document>
  implements IRead<T>, IWrite<T>
{
  constructor(private readonly _model: mongoose.Model<T>) {}

  public async findAll(): Promise<T[]> {
    return this._model.find({});
  }

  public async findById(id: mongoose.Types.ObjectId): Promise<T | null> {
    return this._model.findById(id);
  }

  public async find(query: mongoose.FilterQuery<T>): Promise<T[]> {
    return this._model.find(query);
  }

  public async create(data: T): Promise<T> {
    const model: mongoose.HydratedDocument<T> = new this._model(data);
    return model.save();
  }

  public async update(
    id: mongoose.Types.ObjectId,
    data: mongoose.UpdateQuery<T>
  ): Promise<T | null> {
    // data: { price: 5, name: pizza }
    return this._model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: mongoose.Types.ObjectId): Promise<T | null> {
    return this._model.findByIdAndRemove(id);
  }

  protected createIdFromString(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
