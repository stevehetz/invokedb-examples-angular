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

    const res = await contacts.count();

    const res2 = await contacts
      .find({
        first_name: {
          $ctn: 'low'
        }
      })
      .limit(5)
      .skip(0)
      .exec();

    console.log(res2.data);

    const res3 = await contacts.findOne({
      first_name: {
        $ctn: 'heather',
        case: 'i'
      }
    });

    console.log(res3);

    if (res3) {
      /*await contacts.update([
        {
          _id: res3._id,
          first_name: 'abcdefg'
        }
      ]);*/

      await contacts.delete(7);
    }

    const res4 = await contacts
      .find({ first_name: 'Lowrance' })
      .limit(5)
      .skip(0)
      .exec();

    console.log(res4.data);

    /*await contacts.insert([
      {
        first_name: 'John',
        last_name: 'Stamos'
      },
      {
        first_name: 'Lindsey',
        last_name: 'Hetzel'
      }
    ]);*/
  }
}
