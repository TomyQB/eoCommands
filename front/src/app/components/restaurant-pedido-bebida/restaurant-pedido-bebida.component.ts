import { Component, OnInit } from '@angular/core';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-restaurant-pedido-bebida',
  templateUrl: './restaurant-pedido-bebida.component.html',
  styleUrls: ['./restaurant-pedido-bebida.component.scss']
})
export class RestaurantPedidoBebidaComponent implements OnInit {

  pedido: any = history.state.pedido
  indexs: number = history.state.i

  constructor(public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    localStorage.setItem('tab', "1");
  }

  marcarHecho(){

    this.pedidoServices.pedidoObjeto[this.indexs].hechos = this.pedidoServices.pedidoObjeto[this.indexs].hechos + 1
    this.pedidoServices.pedidoObjeto[this.indexs].estado = 'empezado'

    if(this.pedidoServices.pedidoObjeto[this.indexs].hechos === this.pedidoServices.pedidoObjeto[this.indexs].amounts.length){

      this.pedidoServices.pedidoObjeto[this.indexs].estado = 'terminado'
    }

    localStorage.setItem('pedidos', JSON.stringify(this.pedidoServices.pedidoObjeto))

  }

}
