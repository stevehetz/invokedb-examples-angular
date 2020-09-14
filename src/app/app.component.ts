import { Component, OnInit } from '@angular/core';
import { InvokeDBClient } from 'invokedb';
import { BASE_URL, API_KEY } from 'src/invoke-config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  async ngOnInit() {
    const invokedb = new InvokeDBClient({ baseUrl: BASE_URL, apiKey: API_KEY });
    const contacts = invokedb.table('contacts');
    const winereview = invokedb.table('winereview');

    const res = await contacts
      .find({
        first_name: {
          $ctn: 'bb'
        }
      })
      .limit(2)
      .skip(0)
      .sortBy('first_name')
      .sortDir('desc')
      .exec();

    console.log(res.data);

    const res3 = await contacts.findOne({
      first_name: {
        $ctn: 'low',
        case: 'i'
      }
    });

    console.log(res3);
  }
}
