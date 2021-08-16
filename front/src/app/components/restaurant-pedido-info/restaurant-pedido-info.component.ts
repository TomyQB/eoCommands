import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss']
})
export class RestaurantPedidoInfoComponent implements OnInit {

  pedido: any = history.state.pedido

  constructor(private pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    localStorage.setItem('tab', "0");
  }

  deletePedido(id: number) {
  }

}
