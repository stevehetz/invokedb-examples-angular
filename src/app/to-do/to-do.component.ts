import { Component, OnInit } from '@angular/core';
import { ToDoService } from './to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoAppComponent implements OnInit {
  items = [];
  showCompleted = true;
  updating = false;
  toggling = false;

  constructor(private svc: ToDoService) {}

  async ngOnInit() {
    await this.getItems();
  }

  async getItems() {
    const cache = this.svc.cacheEdits(this.items);
    const res = await this.svc.getItems(this.showCompleted);
    this.items = res.data;
    this.svc.restoreEdits(cache, this.items);
  }

  async onShowCompletedClick(show) {
    this.showCompleted = show;
    await this.getItems();
  }

  async onToggleItemClick(item, isComplete) {
    if (!this.toggling) {
      item.isComplete = isComplete;
      await this.svc.update({ _id: item._id, isComplete });
      await this.svc.getItems();
    }
  }

  async addItem() {
    if (!this.updating) {
      this.updating = true;

      await this.svc.addItem();
      await this.getItems();
      this.editItem(this.items[this.items.length - 1]);

      this.updating = false;
    }
  }

  editItem(item) {
    if (item) {
      item.edit = true;
      item.cached = item.name;
    }
  }

  async deleteItem(item) {
    if (!this.updating) {
      this.updating = true;

      await this.svc.delete(item, this.items);

      this.updating = false;
    }
  }

  cancelItem(item) {
    item.name = item.cached;
    item.edit = false;
  }

  async saveItem(item) {
    item = { _id: item._id, name: item.name };
    await this.svc.update(item);

    const _item = this.items.find(i => i._id === item._id);
    _item.edit = false;
  }
}
