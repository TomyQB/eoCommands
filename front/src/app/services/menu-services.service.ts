import { CategoryDTO } from './../models/CategoryDTO';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class MenuServicesService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getMenu(restaurantName: string) {
    return this.http.get<any>(this.Url + "menu/" + restaurantName)
  }

  addCategory(category: CategoryDTO) {
    return this.http.post<any>(this.Url + "createCategory", category)
  }

  deleteCategory(id: number) {
    return this.http.post<any>(this.Url + "deleteCategory", id)
  }
}
