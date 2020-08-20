import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, API_KEY } from 'src/invoke-config.json';
import { IGetParams } from './invokedb.params';

@Injectable({
  providedIn: 'root'
})
export class InvokedbService {
  constructor(private http: HttpClient) {}

  get(tableName: string, params: IGetParams, filter?: any) {
    const { skip, limit, sort } = params;

    let urlQuery = `?api_key=${API_KEY}`;
    urlQuery += `&skip=${skip}`;
    urlQuery += `&limit=${limit}`;

    if (sort) {
      urlQuery += `&sort_by=${sort.sortBy}`;
      urlQuery += `&sort_dir=${sort.sortDir}`;
    }

    return filter
      ? this.http.post(`${BASE_URL}/search/${tableName}${urlQuery}`, filter)
      : this.http.get(`${BASE_URL}/get/${tableName}${urlQuery}`);
  }

  update(tableName: string, data: any) {
    const url = `${BASE_URL}/update/${tableName}?api_key=${API_KEY}`;
    return this.http.put(url, data);
  }

  delete(tableName: string, data: any) {
    const url = `${BASE_URL}/delete/${tableName}?api_key=${API_KEY}`;
    return this.http.post(url, data);
  }

  create(tableName: string, data: any) {
    const url = `${BASE_URL}/create/${tableName}?api_key=${API_KEY}`;
    return this.http.post(url, data);
  }
}
