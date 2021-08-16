import { Pedido } from './../models/Pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PendingOrderService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  madePendingOrder(pedido: Pedido) {
    return this.http.post<any>(this.Url + "madePendingOrder", pedido)
  }

  getAllPendingOrder(restaurantId: number) {
    return this.http.post<any>(this.Url + "allPendingOrder", restaurantId)
  }

  getPendingOrderByTable(idTable: Pedido) {
    return this.http.post<any>(this.Url + "filterPendingOrder", idTable)
  }

  deletePendingOrder(idTable: Pedido) {
    return this.http.post<any>(this.Url + "deletePendingOrder", idTable)
  }

}
