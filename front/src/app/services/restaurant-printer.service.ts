import { TotalOrdersRecord } from '../models/TotalOrdersRecord';

import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestaurantPrinterService {
  Url = environment.Url;

  constructor(private http: HttpClient) {}

  getPrinters(restaurantId: number) {
    return this.http.get<any>(this.Url + 'getPrinters/' + restaurantId);
  }

  postPrinters(printers: any[], restaurantId: number) {
    return this.http.post<any>(
      this.Url + 'savePrinters/' + restaurantId,
      printers
    );
  }
}
