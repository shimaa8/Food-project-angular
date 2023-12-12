import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _HttpClient: HttpClient) { }

  getTags(): Observable<any> {
    return this._HttpClient.get('tag')
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get('Category', { params: { pageSize: 100 } })
  }
  getCurrentUser(): Observable<any> {
    return this._HttpClient.get('Users/currentUser')
  }




}
