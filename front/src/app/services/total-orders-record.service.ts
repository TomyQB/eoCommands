import { TotalOrdersRecord } from './../models/TotalOrdersRecord';

import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TotalOrdersRecordService {

  public orderRecord!: TotalOrdersRecord[];

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getTotalOrdersRecord(restaurantId: number) {
    return this.http.post<any>(this.Url + "getTotalOrdersRecord", restaurantId)
  }

  updateTotalOrdersRecord(restaurantId: number) {
    return this.http.post<any>(this.Url + "updateTotalOrdersRecord", restaurantId)
  }
}
