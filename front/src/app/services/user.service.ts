import { userRestaurant } from './../models/userRestaurant';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  login(user: userRestaurant) {
    return this.http.post<any>(this.Url + "login", user)
  }

}
