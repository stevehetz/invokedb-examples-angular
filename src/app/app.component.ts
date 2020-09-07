import { Component, OnInit } from '@angular/core';
import { InvokeDBClient } from 'invokedb';
import { API_KEY } from 'src/invoke-config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    const invokedb = new InvokeDBClient({ apiKey: API_KEY });
    const contacts = invokedb.table('contacts');

    const res = await contacts.get({
      skip: 0,
      limit: 10,
      filter: {
        first_name: {
          value: 'Low',
          type: 'contains',
          case: 'insensitive'
        }
      }
    });

    console.log(res);
  }
}
