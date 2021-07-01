import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url = "http://localhost:8080/test/2"

  constructor(private http: HttpClient) { }

  public categories() {
    return this.http.get<any>(this.Url);
  }
}
