import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MenuServicesService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getMenu(restaurantName: string) {
    // const restaurantName = localStorage.getItem("name")
    return this.http.get<any>(this.Url + "menu/" + restaurantName)
  }
}
