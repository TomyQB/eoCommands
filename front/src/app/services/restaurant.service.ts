import { RestaurantDTO } from './../models/RestaurantDTO';
import { RestaurantFormMainPage } from './../models/RestaurantFormMainPage';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  Url = environment.Url;
  mailConfiguration = sessionStorage.getItem('mailConfiguration')!;
  constructor(private http: HttpClient) {}

  getRestaurantImage(restaurantName: string) {
    return this.http.post<any>(this.Url + 'restaurant', restaurantName);
  }

  updateRestaurantPhoto(restaurant: RestaurantDTO) {
    return this.http.post<any>(this.Url + 'photoRestaurant', restaurant);
  }

  sendFormMessage(dto: RestaurantFormMainPage) {
    return this.http.post<any>(this.Url + 'form', dto);
  }

  login(user: Login) {
    return this.http.post<any>(this.Url + 'login', user);
  }
}
