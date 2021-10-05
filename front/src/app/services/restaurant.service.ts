import { RestaurantDTO } from './../models/RestaurantDTO';
import { RestaurantFormMainPage } from './../models/RestaurantFormMainPage';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { RestaurantLogin } from '../models/RestaurantLogin';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getRestaurantImage(restaurantName: string) {
    return this.http.post<any>(this.Url + "restaurant", restaurantName)
  }

  updateRestaurantPhoto(restaurant: RestaurantDTO) {
    return this.http.post<any>(this.Url + 'photoRestaurant', restaurant)
  }

  sendFormMessage(dto: RestaurantFormMainPage) {
    return this.http.post<any>(this.Url + "form", dto)
  }

  login(user: RestaurantLogin) {
    return this.http.post<any>(this.Url + "login", user)
  }
}
