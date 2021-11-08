import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CurrencySumbolService {

  symbol: string = "";

  constructor(private http: HttpClient) { }

  public setCurrencySymbol() {
    return this.http.get<any>("https://api.ipgeolocation.io/ipgeo?apiKey=d133dc518c654f2b88f336e1c1af5611")
  }
}
