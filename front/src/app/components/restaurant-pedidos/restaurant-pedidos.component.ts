import { Pedido } from './../../models/Pedido';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  public selectedIndex: number = 0;

  userId: number = parseInt(localStorage.getItem('userId')!)

  pedidos!: any[]
  pendingOrders!: any[]

  constructor(private pedidoServices: PedidoServicesService, private router: Router, private pendingOrderService: PendingOrderService) { }

  ngOnInit(): void {

    this.selectedIndex = parseInt(localStorage.getItem('tab')!)

    this.pedidoServices.getAllPedidos(this.userId).subscribe(data => {
      this.pedidos = data
      console.log(data)
    })

    this.pendingOrderService.getAllPendingOrder(this.userId).subscribe(data => {
      this.pendingOrders = data
    })
  }

  eliminarPedidosOutput(event: any) {
    this.pedidos = event
  }

  eliminarPendingOrdersOutput(event: any) {
    this.pendingOrders = event
  }

}
