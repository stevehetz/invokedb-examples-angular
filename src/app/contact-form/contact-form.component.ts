import { Component, OnInit } from '@angular/core';
import { IGetParams } from 'src/app/invokedb/invokedb.params';
import { map } from 'rxjs/operators';
import { ContactFormService } from './contact-form.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contacts = [];
  totalContacts = 0;
  searchText: string = null;
  searching = false;
  searchDebounce = null;
  contactSelected = false;
  selectedContactIndex: number = null;
  selectedContact: any = this.svc.newContact();
  loadingContacts = false;
  editing = false;
  adding = false;
  message = null;
  pageNumber = 0;
  contactParams: IGetParams = {
    skip: 0,
    limit: 10
  };

  constructor(private svc: ContactFormService) {}

  ngOnInit(): void {
    this.loadContacts().subscribe(res => this.selectContact(this.contacts[0]));
  }

  loadContacts() {
    this.loadingContacts = true;
    return this.svc.get(this.searchText, this.contactParams).pipe(
      map((res: any) => {
        this.totalContacts = res.count;
        this.contacts = res.data.map(c => this.formatContact(c));
        this.loadingContacts = false;
        return res;
      })
    );
  }

  formatContact(contact) {
    contact = this.svc.formatDate(contact);
    contact = this.svc.addFullName(contact);
    return contact;
  }

  search() {
    this.loadingContacts = true;
    window.clearTimeout(this.searchDebounce);
    this.searchDebounce = window.setTimeout(() => {
      this.loadContacts().subscribe();
    }, 500);
  }

  paginate(event) {
    this.pageNumber = event.page;
    this.contactParams.skip = event.page * this.contactParams.limit;
    this.loadContacts().subscribe();
  }

  selectContact(event) {
    this.contactSelected = true;
    this.selectedContact = event.value || event;
    this.selectedContactIndex = null;
    this.contacts.forEach((c, i) => {
      if (c._id === this.selectedContact._id) {
        this.selectedContactIndex = i + this.contactParams.skip;
      }
    });
  }

  clearSelected() {
    this.contactSelected = false;
    this.selectedContact = this.svc.newContact();
  }

  addContact() {
    this.contactSelected = false;
    this.adding = true;
    this.selectedContact = this.svc.newContact();
  }

  editContact() {
    this.editing = true;
  }

  cancel() {
    this.adding = false;
    this.editing = false;
  }

  deleteContact() {
    concat(
      this.svc.delete(this.selectedContact._id),
      this.loadContacts()
    ).subscribe({
      complete: () => {
        this.clearSelected();
        this.showMessage('Contact deleted');
      }
    });
  }

  saveContact() {
    if (this.editing) {
      this.updateContact(this.selectedContact);
    } else if (this.adding) {
      this.createContact(this.selectedContact);
    }
  }

  updateContact(contact) {
    const onContactSaved = () => {
      contact = this.contacts.find(c => c._id === contact._id);
      this.selectContact(contact);
      this.showMessage('Contact updated');
      this.editing = false;
    };

    concat(this.svc.update(contact), this.loadContacts()).subscribe({
      complete: onContactSaved
    });
  }

  createContact(contact) {
    this.goToLastPage();

    const onContactSaved = () => {
      const index = this.contacts.length - 1;
      this.selectContact(this.contacts[index]);
      this.showMessage('Contact saved');
      this.adding = false;
    };

    concat(this.svc.create(contact), this.loadContacts()).subscribe({
      complete: onContactSaved
    });
  }

  goToLastPage() {
    const { limit } = this.contactParams;
    this.contactParams.skip = Math.floor(this.totalContacts / limit) * limit;
  }

  showMessage(msg) {
    this.message = msg;
    setTimeout(() => (this.message = null), 3000);
  }
}
