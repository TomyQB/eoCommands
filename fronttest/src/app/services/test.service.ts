import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url = "http://localhost:8080/test/2"
  DeleteUrl = "http://localhost:8080/delete"
  ConverterUrl = "http://localhost:8080/converter"

  constructor(private http: HttpClient) { }

  public categories() {
    return this.http.get<any>(this.Url);
  }

  public converter(dto: any) {
    return this.http.post<any>(this.ConverterUrl, dto);
  }

  public delete(info: any) {
    console.log(info)
    return this.http.post<any>(this.DeleteUrl, info);
  }
}
