import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _HttpClient: HttpClient) { }

  getCategories(data: any): Observable<any> {
    return this._HttpClient.get('Category', { params: data })
  }
  addCategory(data: any): Observable<any> {
    return this._HttpClient.post('Category', { name: data })
  }
  deleteCategory(id: number): Observable<any> {
    return this._HttpClient.delete(`Category/${id}`)
  }

}
