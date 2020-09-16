import { Injectable } from '@angular/core';
import { invokedbClient } from 'src/invokedb-client';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  todo = invokedbClient.table('todo');

  constructor() {}

  async getItems(showCompleted = true) {
    const filter: any = {};

    if (!showCompleted) {
      filter.isComplete = { $eq: 'no' };
    }

    return await this.todo.find(filter).limit(200).exec();
  }

  async update(item) {
    await this.todo.update(item);
  }

  async delete(item, items) {
    await this.todo.delete(item._id);

    const itemIndex = items.map(_item => _item._id).indexOf(item._id);
    items.splice(itemIndex, 1);
  }

  async addItem() {
    await this.todo.insert({ name: '', isComplete: 'no' });
  }

  cacheEdits(items) {
    const editing = {};
    items.forEach((item, index) => {
      if (item.edit) {
        editing[index] = {
          name: item.name,
          cached: item.cached
        };
      }
    });
    return editing;
  }

  restoreEdits(cache, items) {
    items.forEach((item, index) => {
      if (cache[index]) {
        item.edit = true;
        item.name = cache[index].name;
        item.cached = cache[index].cached;
      }
    });
  }
}
