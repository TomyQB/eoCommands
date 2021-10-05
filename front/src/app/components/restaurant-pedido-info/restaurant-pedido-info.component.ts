import { Component, OnInit, OnChanges } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss']
})
export class RestaurantPedidoInfoComponent implements OnInit {


  pedido: any = JSON.parse(sessionStorage .getItem('pedidoInfoPlates')!)
  indexs: number = parseInt(sessionStorage .getItem('index')!)

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    console.log(this.pedido)
    this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage .getItem('pedidos')!)
    sessionStorage .setItem('tab', "0");
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
    sessionStorage .setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

    console.log(JSON.parse(sessionStorage .getItem('pedidos')!))

  }

}
