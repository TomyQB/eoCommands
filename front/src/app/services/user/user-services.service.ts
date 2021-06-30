import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { UserRestaurant } from '../../models/UserRestaurant'

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  Url='http://localhost:8080/'

  constructor(private http: HttpClient) { }

  public test(user: UserRestaurant) {
    console.log(user)
    return this.http.post<UserRestaurant>(this.Url + "test", user);
  }
}
