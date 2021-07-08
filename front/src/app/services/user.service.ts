import { userRestaurant } from './../models/userRestaurant';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  login(user: userRestaurant) {
    console.log(user)
    return this.http.post<any>(this.Url + "login", user)
  }
}
