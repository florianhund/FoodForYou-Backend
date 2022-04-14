import mongoose from 'mongoose';

import { IRead, IWrite } from '../../interfaces';
import { MongooseOrder } from '../../interfaces/types';

export default class BaseRepository<T extends mongoose.Document>
  implements IRead<T>, IWrite<T>
{
  constructor(private readonly _model: mongoose.Model<T>) {}

  public async findAll(order?: MongooseOrder[]): Promise<T[]> {
    return this._model.find({}).sort(order || {});
  }

  public async findById(id: mongoose.Types.ObjectId): Promise<T | null> {
    return this._model.findById(id);
  }

  public async find(
    query: mongoose.FilterQuery<T>,
    order?: MongooseOrder[]
  ): Promise<T[]> {
    return this._model.find(query).sort(order || {});
  }

  public async create(data: T): Promise<T> {
    return this._model.create(data);
  }

  public async update(
    id: mongoose.Types.ObjectId,
    data: mongoose.UpdateQuery<T>
  ): Promise<T | null> {
    return this._model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: mongoose.Types.ObjectId): Promise<T | null> {
    return this._model.findByIdAndRemove(id);
  }

  public createIdFromString(id: string) {
    return new mongoose.Types.ObjectId(id);
  }
}
