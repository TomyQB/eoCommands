import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  public test() {
    return this.http.get<any>(this.Url + "test");
  }
}
