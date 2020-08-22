import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL, API_KEY } from 'src/invoke-config.json';
import { IGetParams } from './invokedb.params';

@Injectable({
  providedIn: 'root'
})
export class InvokedbService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    return new HttpHeaders().set('Authorization', `Bearer ${API_KEY}`);
  }

  get(tableName: string, params: IGetParams, filter?: any) {
    const { skip, limit, sort } = params;

    let urlQuery = '';
    urlQuery += `?skip=${skip}`;
    urlQuery += `&limit=${limit}`;

    if (sort) {
      urlQuery += `&sort_by=${sort.sortBy}`;
      urlQuery += `&sort_dir=${sort.sortDir}`;
    }

    const headers = this.getHeaders();

    return filter
      ? this.http.post(`${BASE_URL}/search/${tableName}${urlQuery}`, filter, { headers })
      : this.http.get(`${BASE_URL}/get/${tableName}${urlQuery}`, { headers });
  }

  update(tableName: string, data: any) {
    const headers = this.getHeaders();
    const url = `${BASE_URL}/update/${tableName}`;
    return this.http.put(url, data, { headers });
  }

  delete(tableName: string, data: any) {
    const headers = this.getHeaders();
    const url = `${BASE_URL}/delete/${tableName}`;
    return this.http.post(url, data, { headers });
  }

  create(tableName: string, data: any) {
    const headers = this.getHeaders();
    const url = `${BASE_URL}/create/${tableName}`;
    return this.http.post(url, data, { headers });
  }
}
