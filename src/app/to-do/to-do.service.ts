import { Injectable } from '@angular/core';
import { IGetParams } from '../invokedb/invokedb.params';
import { InvokedbService } from '../invokedb/invokedb.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  constructor(private invokedb: InvokedbService) {}

  getItems(showCompleted = true) {
    const params: IGetParams = {
      skip: 0,
      limit: 200
    };

    let filter;

    if (!showCompleted) {
      filter = {
        isComplete: {
          value: 'no',
          type: 'equals'
        }
      };
    }

    return this.invokedb
      .get('todo', params, filter)
      .pipe(map((res: any) => res.data));
  }

  getItem(id) {
    const params: IGetParams = {
      skip: 0,
      limit: 1
    };

    const filter = { _id: id };

    return this.invokedb
      .get('todo', params, filter)
      .pipe(map((res: any) => res.data[0]));
  }

  update(item) {
    return this.invokedb.update('todo', [item]);
  }

  delete(item, items) {
    const itemIndex = items.map(_item => _item._id).indexOf(item._id);
    return this.invokedb
      .delete('todo', [item._id])
      .pipe(map(() => items.splice(itemIndex, 1)));
  }

  addItem() {
    const item = { name: '', isComplete: 'no' };
    return this.invokedb.create('todo', [item]);
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
