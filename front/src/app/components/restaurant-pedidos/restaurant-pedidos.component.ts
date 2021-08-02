import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  userId: number = history.state.userId

  pedidos!: any[]

  constructor(private pedidoServices: PedidoServicesService, private router: Router) { }

  ngOnInit(): void {
    this.pedidoServices.getAllPedidos(this.userId).subscribe(data => {
      this.pedidos = data
      console.log(this.pedidos)
    })
  }

  plateView(i: number) {
    this.router.navigateByUrl("/restaurantPedidosInfo", {state: {pedido: this.pedidos[i]}});
  }

}
