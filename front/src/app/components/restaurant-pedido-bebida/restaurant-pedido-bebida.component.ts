import { Component, OnInit } from '@angular/core';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-restaurant-pedido-bebida',
  templateUrl: './restaurant-pedido-bebida.component.html',
  styleUrls: ['./restaurant-pedido-bebida.component.scss']
})
export class RestaurantPedidoBebidaComponent implements OnInit {

  pedido = JSON.parse(localStorage.getItem('pedidoInfoPlates')!)
  indexs = parseInt(localStorage.getItem('index')!)

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    this.pedidoServices.pedidoObjeto = JSON.parse(localStorage.getItem('pedidos')!)

    localStorage.setItem('tab', "1");
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
