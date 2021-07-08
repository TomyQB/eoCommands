import { PedidoDTO } from './../models/PedidoDTO';
import { Amount } from './../models/Amount';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Plate } from '../models/Plate';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicesService {

  Url = "http://localhost:8080/"

  constructor(private http: HttpClient) { }

  sendPlate(plate: Plate) {
    console.log(plate)
    return this.http.post<any>(this.Url + "converter", plate)
  }

  madePedido(pedido: PedidoDTO) {
    console.log(pedido)
    return this.http.post<any>(this.Url + "madePedido", pedido)
  }

  getPedidoInfo() {
    return this.http.get<any>(this.Url + "pedidoInfo")
  }
}
