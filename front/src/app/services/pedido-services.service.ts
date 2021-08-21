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

  pedidoObjeto: any[] = []

  Url = environment.Url

  constructor(private http: HttpClient) { }

  madePedido(pedido: Pedido) {
    return this.http.post<any>(this.Url + "madePedido", pedido)
  }

  getAllPedidos(idUser: number): Observable<any[]> {
    return this.http.post<any>(this.Url + "pedido", idUser)
  }

  deletePedido(idPedido: Pedido) {
    return this.http.post<any>(this.Url + "delete", idPedido)
  }

  deletePedidoObjeto(numTable: number) {
    for(let i = 0; i < this.pedidoObjeto.length; i++) {
      if(this.pedidoObjeto[i].tableNum == numTable) {
        this.pedidoObjeto.splice(i, 1)
        localStorage.setItem('pedidos', JSON.stringify(this.pedidoObjeto))
      }
    }
    // console.log(this.pedidoObjeto.find(pedido => pedido.numTable == numTable))
  }

}
