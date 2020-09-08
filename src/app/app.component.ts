import { Component, OnInit } from '@angular/core';
import { InvokeDBClient } from 'invokedb';
import { API_KEY } from 'src/invoke-config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  async ngOnInit() {}
}
