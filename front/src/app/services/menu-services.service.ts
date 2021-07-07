import { Category } from './../models/Category';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MenuServicesService {

  Url = "http://localhost:8080/menu/"

  constructor(private http: HttpClient) { }

  getMenu() {
    const id = localStorage.getItem("id")
    console.log(id)
    return this.http.get<any>(this.Url + id)
  }
}
