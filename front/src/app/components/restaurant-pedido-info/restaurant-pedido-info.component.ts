import { Component, OnInit, OnChanges } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss']
})
export class RestaurantPedidoInfoComponent implements OnInit {


  pedido: any = JSON.parse(localStorage.getItem('pedidoInfoPlates')!)
  indexs: number = parseInt(localStorage.getItem('index')!)

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    this.pedidoServices.pedidoObjeto = JSON.parse(localStorage.getItem('pedidos')!)
    localStorage.setItem('tab', "0");
  }

  ngOnDestroy(): void {
    window.location.reload()
  }

  marcarHecho(i: number, servido: boolean){

    this.pedidoServices.pedidoObjeto[this.indexs].estado = 'empezado'

    if(!this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
      this.pedidoServices.pedidoObjeto[this.indexs].hechos ++

    }

    if(this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
      this.pedidoServices.pedidoObjeto[this.indexs].hechos --
    }

    if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === this.pedidoServices.pedidoObjeto[this.indexs].amounts.length){
      this.pedidoServices.pedidoObjeto[this.indexs].estado = 'terminado'

    } else if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === 0) this.pedidoServices.pedidoObjeto[this.indexs].estado = 'nada'

    this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido = !servido
    console.log(this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido)
    localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

    console.log(JSON.parse(localStorage.getItem('pedidos')!))

  }

}
