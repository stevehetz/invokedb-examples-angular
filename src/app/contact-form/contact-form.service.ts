import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { IGetParams } from '../invokedb/invokedb.params';
import { InvokedbService } from '../invokedb/invokedb.service';
const m: any = moment;
m.suppressDeprecationWarnings = true;

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  contactParams: IGetParams = {
    skip: 0,
    limit: 10
  };

  constructor(private invokedb: InvokedbService) {}

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

  get(searchText, params) {
    let filter;
    if (searchText !== '' && searchText !== null) {
      filter = {
        $or: {
          first_name: {
            value: searchText,
            type: 'contains',
            case: 'insensitive'
          },
          last_name: {
            value: searchText,
            type: 'contains',
            case: 'insensitive'
          }
        }
      };
    }
    return this.invokedb.get('contacts', params, filter);
  }

  delete(id) {
    return this.invokedb.delete('contacts', [id]);
  }

  update(contact) {
    const _contact = Object.assign({}, contact);
    delete _contact.full_name;
    delete _contact.prettyDate;
    return this.invokedb.update('contacts', [_contact]);
  }

  create(contact) {
    return this.invokedb.create('contacts', [contact]);
  }
}
