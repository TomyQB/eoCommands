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

  getAllOrdersRecord(restaurantId: number) {
    return this.http.post<any>(this.Url + "allOrderRecord", restaurantId)
  }

  getPendingOrderByTable(idTable: Pedido) {
    return this.http.post<any>(this.Url + "filterPendingOrder", idTable)
  }

  deletePendingOrder(pedido: Pedido) {
    return this.http.post<any>(this.Url + "deletePendingOrder", pedido)
  }

  deleteOrdersRecord(restaurantId: number) {
    return this.http.post<any>(this.Url + "deleteOrdersRecord", restaurantId)
  }

  madePendingOrderAdditionalRecord(pendingOrder: any) {
    return this.http.post<any>(this.Url + "madePendingOrderAdditionalRecord", pendingOrder)
  }

  madePendingOrderPlateRecord(pendingOrder: any) {
    return this.http.post<any>(this.Url + "madePendingOrderPlateRecord", pendingOrder)
  }

}
