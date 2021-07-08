import { PedidoDTO } from './../../models/PedidoDTO';
import { Amount } from './../../models/Amount';
import { Plate } from './../../models/Plate';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { PedidoServicesService } from '../../services/pedido-services.service'
import { HashService } from '../../services/hash.service'

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



  constructor(private pedidoServices: PedidoServicesService, private hashService: HashService, private location: Location) { }

  ngOnInit(): void {
    this.amount.amount = this.hashService.getElementByName(this.plate.name)
  }

  addToPedido(description: string) {

    this.amount.description = description

    this.plate.amount = this.amount
    this.pedidoServices.sendPlate(this.plate).subscribe(data => {})

    this.hashService.setAmountByName(this.plate.name, this.amount.amount)

    this.location.back();

  }

  // ngOnDestroy() {
  //   if(this.amount.amount > 0) {
  //     this.plate.amount = this.amount
  //     this.pedidoServices.sendPlate(this.plate).subscribe(data => {})
  //   }

  //   this.hashService.setAmountByName(this.plate.name, this.amount.amount)
  // }

  add() {
    this.amount.amount++
  }

  takeOut() {
    if(this.amount.amount > 0) {
      this.amount.amount--
    }
  }

  writting(event: any) {
    this.amount.description = event
  }

}
