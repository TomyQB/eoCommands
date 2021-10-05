import { Component, OnInit } from '@angular/core';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-restaurant-pedido-bebida',
  templateUrl: './restaurant-pedido-bebida.component.html',
  styleUrls: ['./restaurant-pedido-bebida.component.scss']
})
export class RestaurantPedidoBebidaComponent implements OnInit {

  pedido = JSON.parse(sessionStorage .getItem('pedidoInfoPlates')!)
  indexs = parseInt(sessionStorage .getItem('index')!)

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    this.pedidoServices.pedidoObjeto = JSON.parse(sessionStorage .getItem('pedidos')!)

    sessionStorage .setItem('tab', "1");
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
