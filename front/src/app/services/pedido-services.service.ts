import { PedidoDTO } from './../models/PedidoDTO';
import { Amount } from './../models/Amount';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Plate } from '../models/Plate';

@Injectable({
  providedIn: 'root'
})
export class PedidoServicesService {

  constructor() { }

  addAmountToPlate(plate: Plate, amount: Amount) {
    console.log(amount)
    console.log(plate)
    plate.amount = amount
    // this.addPlateToPedido(plate, pedido)
  }

  addPlateToPedido(plate: Plate, pedidoDTO: PedidoDTO) {
    const p = pedidoDTO.plates.find(x => x == plate)
    if(p != undefined){
      const i = pedidoDTO.plates.indexOf(p)
      pedidoDTO.plates.splice(i)
    }
    pedidoDTO.plates.push(plate)
  }
}
