import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IGetParams } from '../invokedb/invokedb.params';
import { InvokedbService } from '../invokedb/invokedb.service';

import { InvokeDBClient, InvokeDBTable } from 'invokedb';
import { API_KEY } from 'src/invoke-config.json';

const m: any = moment;
m.suppressDeprecationWarnings = true;

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private contactsTbl: InvokeDBTable;

  constructor(private invokedb: InvokedbService) {
    const invokedbClient = new InvokeDBClient({ apiKey: API_KEY });
    this.contactsTbl = invokedbClient.table('contacts');
  }

  newContact() {
    return {
      first_name: '',
      last_name: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: ''
    };
  }

  formatDate(contact) {
    return Object.assign({}, contact, {
      prettyDate: moment.utc(contact.dob).format('MMMM Do YYYY')
    });
  }

  addFullName(contact) {
    return Object.assign({}, contact, {
      full_name: `${contact.last_name}, ${contact.first_name}`
    });
  }

  async get(searchText, skip, limit) {
    const filter: any = {};
    if (searchText !== '' && searchText !== null) {
      filter.$or = {};
      filter.$or.first_name = { $ctn: searchText };
      filter.$or.last_name = { $ctn: searchText };
    }

    return await this.contactsTbl.find(filter).limit(limit).skip(skip).exec();
  }

  async delete(id) {
    return await this.contactsTbl.delete(id);
  }

  async update(contact) {
    const _contact = Object.assign({}, contact);
    delete _contact.full_name;
    delete _contact.prettyDate;
    return await this.contactsTbl.update(_contact);
  }

  async create(contact) {
    return await this.contactsTbl.insert(contact);
  }
}
