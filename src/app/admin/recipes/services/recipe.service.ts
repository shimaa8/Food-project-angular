import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _HttpClient: HttpClient) { }

  getRecipes(data: any): Observable<any> {
    return this._HttpClient.get('Recipe', { params: data })
  }
  getRecipeById(id: number): Observable<any> {
    return this._HttpClient.get(`Recipe/${id}`)
  }
  addRecipe(data: any): Observable<any> {
    return this._HttpClient.post('Recipe', data)
  }
  editRecipe(id: number, data: any): Observable<any> {
    return this._HttpClient.put(`Recipe/${id}`, data)
  }
  deleteRecipe(id: number): Observable<any> {
    return this._HttpClient.delete(`Recipe/${id}`)
  }
}
