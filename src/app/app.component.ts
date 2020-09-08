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

    const res = await contacts.find({
      skip: 10,
      limit: 20,
      sortBy: 'first_name',
      sortDir: 'desc',
      filter: {
        first_name: {
          value: 'L',
          type: 'contains'
        }
      }
    });

    console.log(res.data);

    const res2 = await contacts.findOne({
      skip: 10,
      sortBy: 'first_name',
      sortDir: 'asc',
      filter: {
        first_name: {
          value: 'L',
          type: 'contains'
        }
      }
    });

    console.log(res2);

    /*const res3 = await contacts.findOne({
      first_name: {
        contains: 'low',
        case: 'i'
      }
    });

    console.log(res3);*/
  }
}
