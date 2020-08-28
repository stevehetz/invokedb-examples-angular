import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { ToDoService } from './to-do.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoAppComponent implements OnInit {
  items = [];
  showCompleted = true;
  updating = false;

  constructor(private svc: ToDoService) {}

  ngOnInit(): void {
    this.getItems().subscribe();
  }

  getItems() {
    const cache = this.svc.cacheEdits(this.items);

    return this.svc.getItems(this.showCompleted).pipe(
      map(items => (this.items = items)),
      map(() => this.svc.restoreEdits(cache, this.items))
    );
  }

  onShowCompletedClick(show) {
    this.showCompleted = show;
    this.getItems().subscribe();
  }

  onToggleItemClick(_id, isComplete) {
    const item = { _id, isComplete };
    this.updateItem(item).subscribe();
  }

  addItem() {
    if (!this.updating) {
      this.updating = true;

      concat(this.svc.addItem(), this.getItems())
        .pipe(finalize(() => (this.updating = false)))
        .subscribe({
          complete: () => this.editItem(this.items[this.items.length - 1])
        });
    }
  }

  updateItem(item) {
    return concat(this.svc.update(item), this.getItems());
  }

  editItem(item) {
    if (item) {
      item.edit = true;
      item.cached = item.name;
    }
  }

  deleteItem(item) {
    if (!this.updating) {
      this.updating = true;
      this.svc
        .delete(item, this.items)
        .pipe(finalize(() => (this.updating = false)))
        .subscribe();
    }
  }

  cancelItem(item) {
    item.name = item.cached;
    item.edit = false;
  }

  saveItem(item) {
    item = { _id: item._id, name: item.name };
    this.updateItem(item).subscribe(() => {
      const _item = this.items.find(i => i._id === item._id);
      _item.edit = false;
    });
  }
}
