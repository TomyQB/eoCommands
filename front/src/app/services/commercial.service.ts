
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class CommercialService {

  Url = environment.Url

  constructor(private http: HttpClient) { }


  login(user: Login) {
    return this.http.post<any>(this.Url + "loginCommercial", user)
  }

}
