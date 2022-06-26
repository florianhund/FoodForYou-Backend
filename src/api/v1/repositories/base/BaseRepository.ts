import mongoose from 'mongoose';

import { IRead, IWrite } from '../../interfaces';
import { MongooseOrder } from '../../interfaces/types';

export default class BaseRepository<T extends mongoose.Document>
  implements IRead<T>, IWrite<T>
{
  constructor(private readonly _model: mongoose.Model<T>) {}

  public async findAll(
    order?: MongooseOrder[],
    fields?: string[]
  ): Promise<T[]> {
    return this._model
      .find({})
      .sort(order || [])
      .select(fields || []);
  }

  public async findById(
    id: mongoose.Types.ObjectId,
    fields?: string[]
  ): Promise<T | null> {
    return this._model.findById(id).select(fields);
  }

  public async find(
    query: mongoose.FilterQuery<T>,
    order?: MongooseOrder[],
    fields?: string[]
  ): Promise<T[]> {
    return this._model
      .find(query)
      .sort(order || [])
      .select(fields || []);
  }

  public async create(data: T): Promise<T> {
    return this._model.create(data);
  }

  public async update(
    id: mongoose.Types.ObjectId,
    data: any
  ): Promise<T | null> {
    // const doc = await this._model.findById(id);
    // if (!doc) return null;
    // const updatedDoc = await this._model.findByIdAndUpdate(id, data, {
    //   new: true
    // });
    // doc.save();
    // return updatedDoc;
    return this._model.findByIdAndUpdate(id, data, { new: true });
    // return this._model.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  public async delete(id: mongoose.Types.ObjectId): Promise<T | null> {
    return this._model.findByIdAndRemove(id);
  }

  public static createIdFromString(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  public static getSortQuery(sort: string): MongooseOrder[] {
    const sortArray: MongooseOrder[] = [];

    if (!sort) return sortArray;

    const sorts = sort.split(',');
    sorts.forEach((sort, i) => {
      const dir = sort[0] === '-' ? -1 : 1;
      const field = dir === 1 ? sort : sort.slice(1);
      sortArray[i] = [field, dir];
    });

    return sortArray;
  }
}
