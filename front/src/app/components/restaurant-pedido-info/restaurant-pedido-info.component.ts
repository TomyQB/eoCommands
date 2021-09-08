import { Component, OnInit, OnChanges } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss']
})
export class RestaurantPedidoInfoComponent implements OnInit {

  pedido: any = history.state.pedido
  indexs: number = history.state.i

  checked: boolean = false

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    localStorage.setItem('tab', "0");
  }

  marcarHecho(i: number){
    this.pedidoServices.pedidoObjeto[this.indexs].estado = 'empezado'

    if(!this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
      this.pedidoServices.pedidoObjeto[this.indexs].hechos ++
    }

    if(this.pedidoServices.pedidoObjeto[this.indexs].amounts[i].servido) {
      this.pedidoServices.pedidoObjeto[this.indexs].hechos --
    }

     /*= this.pedidoServices.pedidoObjeto[this.indexs].hechos + 1*/

    if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === this.pedidoServices.pedidoObjeto[this.indexs].amounts.length){

      this.pedidoServices.pedidoObjeto[this.indexs].estado = 'terminado'
    } else if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === 0) this.pedidoServices.pedidoObjeto[this.indexs].estado = 'nada'

    localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

  }

}
