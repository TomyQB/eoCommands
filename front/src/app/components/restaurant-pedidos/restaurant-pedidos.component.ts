import { Restaurant } from './../../models/Restaurant';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  public selectedIndex: number = 0;

  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!)
  pedidos!: any[]
  pendingOrders!: any[]

  constructor(private pedidoServices: PedidoServicesService, private pendingOrderService: PendingOrderService) { }

  ngOnInit(): void {
    this.selectedIndex = parseInt(sessionStorage.getItem('tab')!)
    this.getPedidos();

    setInterval(() => {
      this.getPedidos();
      }, 10000);
  }

  getPedidos() {
    this.pedidoServices.getAllPedidos(this.restaurant.id).subscribe(data => {
      this.pedidos = data
    })
  }

  eliminarPedidosOutput() {
    this.getPedidos();
  }

}
