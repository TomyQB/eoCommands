import { userRestaurant } from './../models/userRestaurant';
import { Pedido } from '../models/Pedido';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Plate } from '../models/Plate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicesService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  madePedido(pedido: Pedido) {
    return this.http.post<any>(this.Url + "madePedido", pedido)
  }

  getAllPedidos(idUser: number): Observable<any[]> {
    return this.http.post<any>(this.Url + "pedido", idUser)
  }

  deletePedido(idPedido: number) {
    return this.http.post<any>(this.Url + "delete", idPedido)
  }

}
