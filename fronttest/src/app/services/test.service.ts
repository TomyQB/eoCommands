import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url = "http://localhost:8080/test/1"
  UrlCategories = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public test() {
    return this.http.get<any>(this.Url);
  }

  public categories() {
    return this.http.get<any>(this.UrlCategories);
  }
}
