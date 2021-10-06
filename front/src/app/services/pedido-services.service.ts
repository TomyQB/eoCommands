import { Amount } from './../models/Amount';
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

  changeEstadoFoodPedido(pedido: Pedido) {
    return this.http.post<any>(this.Url + "changeEstadoFoodPedido", pedido)
  }

  changeEstadoDrinkPedido(pedido: Pedido) {
    return this.http.post<any>(this.Url + "changeEstadoDrinkPedido", pedido)
  }

  changeFoodCount(pedido: Pedido) {
    return this.http.post<any>(this.Url + "changeFoodCount", pedido)
  }

  changeDrinkCount(pedido: Pedido) {
    return this.http.post<any>(this.Url + "changeFoodCount", pedido)
  }

  getAllPedidos(idUser: number): Observable<any[]> {
    return this.http.post<any>(this.Url + "pedido", idUser)
  }

  deletePedido(idPedido: Pedido) {
    return this.http.post<any>(this.Url + "delete", idPedido)
  }

  deletePedidoObjeto(numTable: number) {
    var i = 0;
    while(i < this.pedidoObjeto.length) {
      if(this.pedidoObjeto[i].tableNum == numTable) {
        this.pedidoObjeto.splice(i, 1)
      } else i++
    }
    sessionStorage.setItem('pedidos', JSON.stringify(this.pedidoObjeto))
  }

  countFoodAndDrink(amounts: Amount[]): number[] {
    let count: number[] = [0, 0]
    for(let a of amounts) {
      console.log(a.estado)
      if(!a.plate!.drink) count[0]++
      else count[1]++
    }

    return count
  }

}
