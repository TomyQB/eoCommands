import { CategoryDTO } from 'src/app/models/CategoryDTO';
import { Observable } from 'rxjs';
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

  addCategory(category: CategoryDTO): Observable<any> {
    return this.http.post<any>(this.Url + "createCategory", category)
  }

  deleteCategory(id: number, idImage: string) {
    const category: CategoryDTO = {
      id: id,
      idImage: idImage,
      image: "",
      name: "",
      restaurant: 0
    }
    return this.http.post<any>(this.Url + "deleteCategory", category)
  }
}
