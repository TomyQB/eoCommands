import { PedidoDTO } from './../../models/PedidoDTO';
import { Amount } from './../../models/Amount';
import { Plate } from './../../models/Plate';
import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-plate-info',
  templateUrl: './plate-info.component.html',
  styleUrls: ['./plate-info.component.scss']
})
export class PlateInfoComponent implements OnInit {

  plate: Plate = history.state.plate

  amount: Amount = {
    amount: 0,
    description: "",
    subTotal: 0
  }



  constructor(private pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    if(history.state.plate.amount != undefined) {
      this.amount = history.state.plate.amount
    }
  }

  ngOnDestroy() {
    if(this.amount.amount > 0) {
      this.pedidoServices.addAmountToPlate(this.plate, this.amount)
    }
  }

  add() {
    this.amount.amount++
  }

  takeOut() {
    if(this.amount.amount > 0) {
      this.amount.amount--
    }
  }

}
