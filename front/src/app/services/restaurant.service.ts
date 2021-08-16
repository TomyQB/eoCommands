import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getRestaurantImage(restaurantName: string) {
    return this.http.post<any>(this.Url + "restaurant", restaurantName)
  }
}
