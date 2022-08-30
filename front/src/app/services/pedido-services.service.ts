import { WhatsAppDTO } from './../models/WhatsAppDTO';
import { Amount } from './../models/Amount';
import { Pedido } from '../models/Pedido';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Plate } from '../models/Plate';
import { Observable } from 'rxjs';

import  { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicesService {

  pedidoObjeto: any[] = []

  pedidos!: any[]

  Url = environment.Url
  
  stompClient: any;

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
    return this.http.post<any>(this.Url + "changeDrinkCount", pedido)
  }

  getAllPedidos(idUser: number): Observable<any[]> {
    return this.http.post<any>(this.Url + "pedido", idUser)
  }

  enviarCuentaWhatsapp(whatsAppDTO: WhatsAppDTO): Observable<WhatsAppDTO> {
    return this.http.post<any>(this.Url + "enviarCuentaWhatsapp", whatsAppDTO)
  }

  deletePedido(pedido: Pedido) {
    return this.http.post<any>(this.Url + "deletePedido", pedido)
  }
  
  setPedidoPrinted(id: number) {
    return this.http.put<any>(this.Url + "pedidoPrinted", id);
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
      if(!a.plate!.drink) count[0]++
      else count[1]++
    }

    return count
  }

}
