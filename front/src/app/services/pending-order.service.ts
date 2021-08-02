import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Pedido } from '../models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PendingOrderService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  madePendingOrder(pedido: Pedido) {
    console.log(pedido)
    return this.http.post<any>(this.Url + "madePendingOrder", pedido)
  }
}
