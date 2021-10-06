import { Amount } from './../../models/Amount';
import { AmountServicesService } from './../../services/amount-services.service';
import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss']
})
export class RestaurantPedidoInfoComponent implements OnInit {


  pedido: any = JSON.parse(sessionStorage.getItem('pedidoInfoPlates')!)
  index: number = parseInt(sessionStorage.getItem('index')!)

  amount: Amount = {
    amount: 0,
    description: '',
    subTotal: 0,
    extras: [],
    estado: ''
  }

  constructor(public pedidoServices: PedidoServicesService, private amountService: AmountServicesService) { }

  ngOnInit(): void {
    // this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage.getItem('pedidos')!)
    sessionStorage.setItem('tab', "0");
    console.log(this.pedido[this.index])
    console.log(this.index)
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('pedidoInfoPlates')
    sessionStorage.removeItem('index')
  }

  marcarHecho(i: number, estado: string){
    console.log(estado)

    if(estado === "Pendiente") {
      this.changesEstadoLocal(i, "Cocinando")
      this.changeEstadoBBDD(i, "Cocinando")

    } else if(estado === "Cocinando") {
      this.changesEstadoLocal(i, "Terminado")
      this.changeEstadoBBDD(i, "Terminado")

    } else if(estado === "Terminado") {
      this.changesEstadoLocal(i, "Servido")
      this.changeEstadoBBDD(i, "Servido")
      this.addFoodCount()

    }else if(estado === "Servido") {
      this.changesEstadoLocal(i, "Pendiente")
      this.changeEstadoBBDD(i, "Pendiente")
      this.takeOutFoodCount()
    }

    // this.pedidoServices.pedidoObjeto[this.indexs].estado = 'empezado'

    // if(!this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
    //   this.pedidoServices.pedidoObjeto[this.indexs].hechos ++

    // }

    // if(this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
    //   this.pedidoServices.pedidoObjeto[this.indexs].hechos --
    // }

    // if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === this.pedidoServices.pedidoObjeto[this.indexs].amounts.length){
    //   this.pedidoServices.pedidoObjeto[this.indexs].estado = 'terminado'

    // } else if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === 0) this.pedidoServices.pedidoObjeto[this.indexs].estado = 'nada'

    // this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido = !servido
    // console.log(this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido)
    // sessionStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

    // console.log(JSON.parse(sessionStorage.getItem('pedidos')!))

  }

  private changeEstadoBBDD(i: number, estado: string) {
    this.amount.estado = estado;
    this.amount.id = this.pedido.amounts[i].id;
    this.amountService.changeEstadoAmount(this.amount).subscribe(data => {});
  }

  private changesEstadoLocal(i: number, estado: string) {
    console.log("hola")
    this.pedido.amounts[i].estado = estado
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(this.pedido))
  }

  private addFoodCount() {
    this.pedido.hechosFood++
    this.pedidoServices.changeFoodCount(this.pedido).subscribe(data => {})
  }

  private takeOutFoodCount() {
    this.pedido.hechosFood--
    this.pedidoServices.changeFoodCount(this.pedido).subscribe(data => {})
  }

}
