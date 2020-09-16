import { Injectable } from '@angular/core';
import { InvokeDBClient, InvokeDBTable } from 'invokedb';
import { API_KEY } from 'src/invoke-config.json';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private _todo: InvokeDBTable;

  constructor() {
    const invokedbClient = new InvokeDBClient({
      apiKey: API_KEY
    });

    this._todo = invokedbClient.table('todo');
  }

  async getItems(showCompleted = true) {
    const filter: any = {};

    if (!showCompleted) {
      filter.isComplete = { $eq: 'no' };
    }

    return await this._todo.find(filter).limit(200).exec();
  }

  async update(item) {
    await this._todo.update(item);
  }

  async delete(item, items) {
    await this._todo.delete(item._id);

    const itemIndex = items.map(_item => _item._id).indexOf(item._id);
    items.splice(itemIndex, 1);
  }

  async addItem() {
    await this._todo.insert({ name: '', isComplete: 'no' });
  }
}
